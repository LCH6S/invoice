const params = new URLSearchParams(location.search);
const AUTO_REFRESH_INTERVAL_MS = 10_000;
const TENCENT_ABILITIES = [
  "BASE_ABILITY",
  "REAL_ESTATE_ABILITY",
  "REFINED_OIL_ABILITY",
];
const TAXPAYER_TYPE_LABELS = {
  GENERAL: "一般纳税人",
  SMALL_SCALE: "小规模纳税人",
};

const TENCENT_PROCESSING_STATUS_META = {
  APPROVAL_PENDING: "请等待当地税务机关审批",
  ACCESS_CONFIRMED_PENDING: "请商户法定代表人或财务负责人按腾讯页面指引完成接入确认",
  ABILITY_CONFIRMED_PENDING: "请商户法定代表人或财务负责人按腾讯页面指引完成能力授权确认",
  BILLING_PERSON_REGISTER_PENDING: "请商户法定代表人或财务负责人按腾讯页面指引完成开票员设置",
  BILLING_PERSON_CONFIRMED_PENDING: "请开票员按腾讯页面指引完成授权",
  SECURITY_SETTING_PENDING: "请商户法定代表人或财务负责人按腾讯页面指引设置开票安全验证有效期",
};

const TENCENT_FAILED_STATUS_META = {
  MCH_INVITE_FAILED: {
    description: "商户邀请开通失败",
    reason: "单位信息有误，请确认微信支付平台和税务局登记主体信息一致",
  },
  APPLY_FAILED: {
    description: "税局申请不通过，请查看接入失败原因",
    reason: "当地税务机关未通过本次数电发票接入申请",
  },
  DISABLED: {
    description: "未接入或商户解除授权，请重新提交",
    reason: "商户当前未接入，或已在税局解除服务商授权",
  },
  RESOURCE_EXPIRED: {
    description: "商户使用的数电服务商资源已过期",
    reason: "当前数电服务商资源已超过有效期，请联系数电服务商处理",
  },
};

let autoRefreshTimer = null;

function buildInviteRequest(state) {
  return {
    operationType: "AUTH_BINDING",
    fapiaoMode: "TENCENT_DIGITAL_TAX",
    abilities: TENCENT_ABILITIES,
    subMchid: state.wechatMerchantNo,
    inviteCode: `INV-${state.applicationNo}-${state.inviteAttempt}`,
    inviteChannel: "WECHAT_SHOP",
  };
}

function createInitialDemoState() {
  const scenario = params.get("scenario") || "normal";
  const state = {
    merchantNo: params.get("merchant_no") || "1905827611",
    applicationNo: params.get("application_no") || "WXSHOP202607220001",
    scenario,
    bridge: params.get("bridge") || "available",
    view: "opening-flow",
    returnView: "opening-flow",
    taxpayerType: "",
    taxpayerError: "",
    license: {
      companyName: "上海申城能源有限公司",
      taxpayerId: "91310106MA1FY7KX2P",
    },
    wechatMerchantNo: scenario === "no-wechat-merchant" ? "" : "1905827611",
    inviteAttempt: 1,
    inviteRequest: null,
    inviteStatus: "idle",
    accessStatus: "not_started",
    abilities: {},
    currentChannel: "ORIGINAL",
    tencentStatusCode: "AUTHORIZATION_PENDING",
    failureStatusCode: "",
    failureDescription: "",
    failureReason: "",
    simulatorStage: "",
    queryCount: 0,
    lastQuerySource: "",
    autoRefreshActive: false,
    autoRefreshIntervalMs: AUTO_REFRESH_INTERVAL_MS,
    wechatLaunchCount: 0,
    error: "",
    toast: "",
    taxpayerSelectorOpen: false,
    qrPreviewOpen: false,
    retryDialogOpen: false,
  };

  if (state.scenario === "resume-opening") {
    Object.assign(state, {
      taxpayerType: "GENERAL",
      inviteStatus: "opening",
      accessStatus: "merchant_action_required",
    });
    state.inviteRequest = buildInviteRequest(state);
  }

  if (state.scenario === "resume-success") {
    Object.assign(state, {
      taxpayerType: "GENERAL",
      inviteStatus: "success",
      accessStatus: "success",
      abilities: Object.fromEntries(TENCENT_ABILITIES.map((ability) => [ability, "AUTHORIZED"])),
      currentChannel: "TENCENT_LEQI",
    });
    state.inviteRequest = buildInviteRequest(state);
  }

  if (state.scenario === "partial-success") {
    Object.assign(state, {
      taxpayerType: "GENERAL",
      inviteStatus: "opening",
      accessStatus: "tax_processing",
      tencentStatusCode: "APPROVAL_PENDING",
      abilities: {
        BASE_ABILITY: "AUTHORIZED",
        REAL_ESTATE_ABILITY: "AUTHORIZED",
        REFINED_OIL_ABILITY: "PROCESSING",
      },
    });
    state.inviteRequest = buildInviteRequest(state);
  }

  return state;
}

window.demoState = createInitialDemoState();

function renderNavBar() {
  const titles = {
    "opening-flow": "开通数电票",
    "taxpayer-guide": "纳税人类型说明",
    "authorization-guide": "授权操作说明",
    "wechat-shop": "微信小店",
  };
  const isGuide = window.demoState.view === "taxpayer-guide"
    || window.demoState.view === "authorization-guide";
  const action = isGuide ? "return-from-guide" : "leave-opening-flow";
  const backButton = window.demoState.view === "wechat-shop"
    ? '<span class="nav-placeholder" aria-hidden="true"></span>'
    : `
      <button class="nav-back" data-action="${action}" aria-label="返回">
        <i class="bi bi-b-arrow-left" aria-hidden="true"></i>
      </button>`;
  return `
    <header class="nav-bar">
      ${backButton}
      <div class="nav-title">${titles[window.demoState.view] || "开通数电票"}</div>
      <span class="nav-placeholder" aria-hidden="true"></span>
    </header>`;
}

function selectedTaxpayerType() {
  return window.demoState.taxpayerType;
}

function validateTaxpayerType() {
  const value = selectedTaxpayerType();
  if (value) {
    window.demoState.taxpayerType = value;
    window.demoState.taxpayerError = "";
    return true;
  }
  window.demoState.taxpayerError = "请选择纳税人类型";
  showToast("请选择纳税人类型");
  return false;
}

function startWechatAuthorization() {
  if (!validateTaxpayerType()) return;
  enterTencentOpening({ launchAfterCreate: true });
}

async function enterTencentOpening({ launchAfterCreate = false } = {}) {
  if (window.demoState.inviteStatus === "opening") {
    if (launchAfterCreate) launchWechatMiniProgram();
    return;
  }
  stopAutoRefresh();
  window.demoState.inviteStatus = "loading";
  window.demoState.error = "";
  render();
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!window.demoState.wechatMerchantNo) {
    window.demoState.inviteStatus = "blocked";
    window.demoState.error = "未查询到当前使用的微信商户号，请联系收钱吧处理";
    render();
    return;
  }

  createTencentInvite();
  if (launchAfterCreate && window.demoState.inviteStatus === "opening") {
    launchWechatMiniProgram();
  }
}

function createTencentInvite() {
  window.demoState.inviteRequest = buildInviteRequest(window.demoState);
  window.demoState.error = "";
  window.demoState.failureStatusCode = "";
  window.demoState.failureDescription = "";
  window.demoState.failureReason = "";
  window.demoState.tencentStatusCode = "AUTHORIZATION_PENDING";
  window.demoState.accessStatus = "merchant_action_required";

  if (window.demoState.scenario === "invite-failed") {
    applyFailedStatus("MCH_INVITE_FAILED");
    return;
  }

  window.demoState.inviteStatus = "opening";
  render();
}

function hasCompletedTencentOpening() {
  return window.demoState.inviteStatus === "success"
    && window.demoState.accessStatus === "success"
    && TENCENT_ABILITIES.every((ability) => window.demoState.abilities[ability] === "AUTHORIZED");
}

function switchTencentChannelIfComplete() {
  if (!hasCompletedTencentOpening()) return;
  window.demoState.currentChannel = "TENCENT_LEQI";
}

function currentOpeningMessage() {
  if (window.demoState.tencentStatusCode === "AUTHORIZATION_PENDING") {
    return "请微信商户管理员扫码授权";
  }
  return TENCENT_PROCESSING_STATUS_META[window.demoState.tencentStatusCode]
    || "腾讯正在处理，请稍后刷新开通进度";
}

function openGuide(view) {
  window.demoState.taxpayerSelectorOpen = false;
  window.demoState.returnView = window.demoState.view;
  window.demoState.view = view;
  render();
}

function openTaxpayerSelector() {
  window.demoState.taxpayerSelectorOpen = true;
  render();
}

function closeTaxpayerSelector() {
  window.demoState.taxpayerSelectorOpen = false;
  render();
}

function selectTaxpayerType(value) {
  if (!TAXPAYER_TYPE_LABELS[value]) return;
  window.demoState.taxpayerType = value;
  window.demoState.taxpayerError = "";
  window.demoState.taxpayerSelectorOpen = false;
  render();
}

function returnFromGuide() {
  const returnView = window.demoState.returnView || "opening-flow";
  window.demoState.view = returnView;
  window.demoState.returnView = "opening-flow";
  if (returnView === "opening-flow" && window.demoState.inviteStatus === "opening") {
    queryTencentProgress({ source: "guide-return" });
  }
  render();
}

function renderTaxpayerGuide() {
  return `
    <section class="guide-page">
      <h1>如何查看纳税人类型</h1>
      <div class="guide-placeholder">
        <strong>纳税人类型说明将在这里展示</strong>
        <p>后续补充一般纳税人与小规模纳税人的查看路径和判断说明。</p>
      </div>
    </section>`;
}

function renderAuthorizationGuide() {
  return `
    <section class="guide-page">
      <h1>授权操作说明</h1>
      <div class="guide-placeholder">
        <strong>操作说明文案将在这里展示</strong>
        <p>后续补充微信商户管理员、法人或财务负责人的完整授权步骤。</p>
      </div>
      <div class="video-placeholder">
        <strong>操作说明视频</strong>
        <p>后续在这里放置授权操作视频。</p>
      </div>
    </section>`;
}

function renderWechatShopReturn() {
  const completed = hasCompletedTencentOpening();
  return `
    <section class="wechat-shop-return">
      <div class="result-card return-result">
        <strong>${completed ? "数电票开通流程已完成" : "已返回微信小店"}</strong>
        ${completed ? `
          <p>${window.demoState.license.companyName}</p>
          <p>${window.demoState.license.taxpayerId}</p>` : ""}
      </div>
    </section>`;
}

function openingStatusMeta() {
  if (hasCompletedTencentOpening()) return { code: "success", label: "开通成功" };
  if (window.demoState.inviteStatus === "failed") return { code: "failed", label: "开通失败" };
  if (window.demoState.inviteStatus === "opening" || window.demoState.inviteStatus === "loading") {
    return { code: "opening", label: "开通中" };
  }
  return { code: "pending", label: "待开通" };
}

function renderInvoiceInfoSection() {
  const taxpayerTypeLabel = TAXPAYER_TYPE_LABELS[window.demoState.taxpayerType] || "请选择";
  const taxpayerTypeClass = window.demoState.taxpayerType ? "" : " placeholder";
  return `
    <section class="opening-card invoice-info-section">
      <div class="section-header">
        <h1 class="section-title">开票信息确认</h1>
      </div>
      <div class="info-list">
        <div class="info-row"><span>企业名称</span><strong>${window.demoState.license.companyName}</strong></div>
        <div class="info-row"><span>统一社会信用代码</span><strong>${window.demoState.license.taxpayerId}</strong></div>
        <button class="info-row taxpayer-type-row" type="button" data-action="open-taxpayer-selector" aria-haspopup="dialog" aria-expanded="${window.demoState.taxpayerSelectorOpen}">
          <span>纳税人类型</span>
          <strong class="select-value${taxpayerTypeClass}">
            ${taxpayerTypeLabel}
            <i class="bi bi-b-arrow-right" aria-hidden="true"></i>
          </strong>
        </button>
        <div class="taxpayer-guide-helper">
          <a href="#taxpayer-guide" data-action="open-taxpayer-guide">如何查看纳税人类型？</a>
        </div>
      </div>
      ${window.demoState.taxpayerError ? `<p class="field-error">${window.demoState.taxpayerError}</p>` : ""}
    </section>`;
}

function renderTencentStatusContent() {
  if (window.demoState.inviteStatus === "loading") {
    return `<span class="tencent-status-description">正在生成开通信息，请稍候</span>`;
  }
  if (window.demoState.inviteStatus === "blocked") {
    return `<span class="tencent-status-description failed">${window.demoState.error}</span>`;
  }
  if (window.demoState.inviteStatus === "failed") {
    return `
      <span class="tencent-status-description failed">
        <strong>${window.demoState.failureDescription}</strong>
        <span>${window.demoState.failureReason}</span>
      </span>`;
  }
  if (window.demoState.inviteStatus === "opening") {
    return `<span class="tencent-status-description">${currentOpeningMessage()}</span>`;
  }
  return "";
}

function renderTencentQrAction() {
  if (window.demoState.inviteStatus !== "opening") return "";
  return `<button class="inline-action-button" data-action="open-qr-preview">查看授权二维码</button>`;
}

function renderTencentOpeningSection() {
  const status = openingStatusMeta();
  return `
    <section class="opening-card tencent-opening-section">
      <div class="section-header section-title-row">
        <h1>腾讯乐企联用</h1>
        <span class="status-badge ${status.code}">${status.label}</span>
      </div>
      ${renderTencentStatusContent()}
      <div class="merchant-authorization-group">
        <div class="info-list">
          <div class="info-row"><span>微信商户号</span><strong>${window.demoState.wechatMerchantNo || "--"}</strong></div>
        </div>
        ${renderTencentQrAction()}
      </div>
      <div class="authorization-summary">
        <div class="authorization-heading">
          <strong>开通步骤</strong>
          <span>完成以下两步即可开通</span>
        </div>
        <ol>
          <li>
            <strong>微信确认授权</strong>
            <span>微信商户管理员去微信确认授权开通</span>
          </li>
          <li>
            <strong>数电票服务授权</strong>
            <span>法人或财务负责人授权数电票服务</span>
          </li>
        </ol>
        <a class="authorization-guide-link" href="#authorization-guide" data-action="open-authorization-guide">查看详细操作说明</a>
      </div>
    </section>`;
}

function renderSuccessResult() {
  return `
    <section class="result-layout success-state">
      <div class="result-card">
        <i class="bi bi-b-success result-icon success" aria-hidden="true"></i>
        <h1>开通成功</h1>
        <p>该税号已成功开通数电票</p>
        <div class="result-info">
          <strong>${window.demoState.license.companyName}</strong>
          <span>${window.demoState.license.taxpayerId}</span>
        </div>
      </div>
      <button class="action-button primary result-action" data-action="exit-opening-flow">确认</button>
    </section>`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function tencentInvitePosterDataUrl() {
  const finder = (x, y, startX, startY) => {
    const dx = x - startX;
    const dy = y - startY;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  };
  const cells = [];
  for (let y = 0; y < 21; y += 1) {
    for (let x = 0; x < 21; x += 1) {
      const finderValue = finder(x, y, 0, 0) ?? finder(x, y, 14, 0) ?? finder(x, y, 0, 14);
      const dark = finderValue === null ? ((x * 11 + y * 7 + x * y + 39) % 9) < 4 : finderValue;
      if (dark) cells.push(`<rect x="${205 + x * 10}" y="${214 + y * 10}" width="10" height="10" fill="#111827"/>`);
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="620" height="760" viewBox="0 0 620 760">
      <rect width="620" height="760" rx="24" fill="#ffffff"/>
      <rect x="1" y="1" width="618" height="758" rx="23" fill="none" stroke="#e4e7ec" stroke-width="2"/>
      <text x="48" y="62" fill="#ee9e00" font-size="20" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">腾讯乐企联用</text>
      <text x="48" y="108" fill="#1d2129" font-size="30" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">请微信商户管理员扫码授权</text>
      <text x="48" y="144" fill="#86909c" font-size="18" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">使用微信扫描二维码，按页面指引完成开通</text>
      <rect x="165" y="174" width="290" height="290" rx="20" fill="#f7f8fa"/>
      <rect x="185" y="194" width="250" height="250" rx="14" fill="#ffffff" stroke="#e4e7ec" stroke-width="2"/>
      ${cells.join("")}
      <rect x="48" y="500" width="524" height="212" rx="18" fill="#f7f8fa"/>
      <text x="76" y="540" fill="#86909c" font-size="18" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">授权商户信息</text>
      <text x="76" y="584" fill="#86909c" font-size="19" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">企业名称</text>
      <text x="544" y="584" text-anchor="end" fill="#1d2129" font-size="20" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeXml(window.demoState.license.companyName)}</text>
      <text x="76" y="632" fill="#86909c" font-size="19" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">统一社会信用代码</text>
      <text x="544" y="632" text-anchor="end" fill="#1d2129" font-size="20" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeXml(window.demoState.license.taxpayerId)}</text>
      <text x="76" y="680" fill="#86909c" font-size="19" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">微信商户号</text>
      <text x="544" y="680" text-anchor="end" fill="#1d2129" font-size="20" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeXml(window.demoState.wechatMerchantNo)}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function downloadImage(href, filename) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

function savePosterImage() {
  const posterSource = tencentInvitePosterDataUrl();
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 620;
    canvas.height = 760;
    const context = canvas.getContext("2d");
    if (!context) {
      downloadImage(posterSource, `腾讯乐企联用授权二维码-${window.demoState.wechatMerchantNo}.svg`);
      showToast("图片已保存");
      return;
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        showToast("图片保存失败，请稍后重试");
        return;
      }
      const objectUrl = URL.createObjectURL(blob);
      downloadImage(objectUrl, `腾讯乐企联用授权二维码-${window.demoState.wechatMerchantNo}.png`);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      showToast("图片已保存");
    }, "image/png");
  };
  image.onerror = () => showToast("图片保存失败，请稍后重试");
  image.src = posterSource;
}

function launchWechatMiniProgram() {
  if (window.demoState.bridge === "unavailable") {
    showToast("暂无法打开微信，请使用二维码继续开通");
    return;
  }
  window.demoState.wechatLaunchCount += 1;
  showToast("正在打开微信小程序……");
}

function showToast(message) {
  window.demoState.toast = message;
  render();
  window.clearTimeout(window.demoToastTimer);
  window.demoToastTimer = window.setTimeout(() => {
    window.demoState.toast = "";
    render();
  }, 2200);
}

function queryTencentProgress({ source = "auto" } = {}) {
  if (window.demoState.view !== "opening-flow"
    || window.demoState.inviteStatus !== "opening") return;
  window.demoState.queryCount += 1;
  window.demoState.lastQuerySource = source;
}

function startAutoRefresh() {
  if (autoRefreshTimer || window.demoState.inviteStatus !== "opening") return;
  window.demoState.autoRefreshActive = true;
  autoRefreshTimer = window.setInterval(() => {
    queryTencentProgress({ source: "auto" });
  }, AUTO_REFRESH_INTERVAL_MS);
}

function stopAutoRefresh() {
  if (autoRefreshTimer) window.clearInterval(autoRefreshTimer);
  autoRefreshTimer = null;
  window.demoState.autoRefreshActive = false;
}

function syncAutoRefresh() {
  const shouldRefresh = window.demoState.view === "opening-flow"
    && window.demoState.inviteStatus === "opening"
    && !hasCompletedTencentOpening();
  if (shouldRefresh) startAutoRefresh();
  else stopAutoRefresh();
}

function openProgressSimulator() {
  queryTencentProgress({ source: "manual" });
  window.demoState.simulatorStage = "result";
  render();
}

function completeAuthorization() {
  openProgressSimulator();
}

function closeProgressSimulator() {
  window.demoState.simulatorStage = "";
  render();
}

function applySimulatedResult(result) {
  if (result === "success") {
    window.demoState.simulatorStage = "";
    window.demoState.inviteStatus = "success";
    window.demoState.accessStatus = "success";
    window.demoState.abilities = Object.fromEntries(
      TENCENT_ABILITIES.map((ability) => [ability, "AUTHORIZED"]),
    );
    switchTencentChannelIfComplete();
    render();
    return;
  }
  window.demoState.simulatorStage = result;
  render();
}

function applyProcessingStatus(statusCode) {
  if (!TENCENT_PROCESSING_STATUS_META[statusCode]) return;
  window.demoState.simulatorStage = "";
  window.demoState.inviteStatus = "opening";
  window.demoState.accessStatus = "tax_processing";
  window.demoState.tencentStatusCode = statusCode;
  render();
}

function applyFailedStatus(statusCode) {
  const failure = TENCENT_FAILED_STATUS_META[statusCode];
  if (!failure) return;
  window.demoState.simulatorStage = "";
  window.demoState.inviteStatus = "failed";
  window.demoState.accessStatus = "failed";
  window.demoState.failureStatusCode = statusCode;
  window.demoState.failureDescription = failure.description;
  window.demoState.failureReason = failure.reason;
  render();
}

function openQrPreview() {
  if (window.demoState.inviteStatus !== "opening") return;
  window.demoState.qrPreviewOpen = true;
  render();
}

function closeQrPreview() {
  window.demoState.qrPreviewOpen = false;
  render();
}

function openRetryDialog() {
  window.demoState.retryDialogOpen = true;
  render();
}

function closeRetryDialog() {
  window.demoState.retryDialogOpen = false;
  render();
}

function confirmRetry() {
  window.demoState.retryDialogOpen = false;
  window.demoState.inviteAttempt += 1;
  window.demoState.inviteRequest = null;
  window.demoState.scenario = "normal";
  window.demoState.inviteStatus = "idle";
  window.demoState.accessStatus = "not_started";
  window.demoState.failureStatusCode = "";
  window.demoState.failureDescription = "";
  window.demoState.failureReason = "";
  window.demoState.error = "";
  enterTencentOpening();
}

function exitOpeningFlow() {
  stopAutoRefresh();
  window.demoState.simulatorStage = "";
  window.demoState.view = "wechat-shop";
  render();
}

function leaveOpeningFlow() {
  stopAutoRefresh();
  window.demoState.simulatorStage = "";
  window.demoState.view = "wechat-shop";
  render();
}

function renderSimulator() {
  const stage = window.demoState.simulatorStage;
  if (!stage) return "";

  let title = "模拟查询结果";
  let content = `
    <p class="simulator-copy">请选择本次查询返回的状态</p>
    <div class="simulator-options">
      <button class="simulator-option success" data-action="simulate-result" data-result="success"><strong>成功</strong><span>更新为开通成功</span></button>
      <button class="simulator-option danger" data-action="simulate-result" data-result="failure"><strong>失败</strong><span>展示腾讯返回的失败原因</span></button>
      <button class="simulator-option processing" data-action="simulate-result" data-result="processing"><strong>开通中</strong><span>选择当前开通说明</span></button>
    </div>`;

  if (stage === "processing") {
    title = "选择开通中原因";
    content = `
      <p class="simulator-copy">请选择腾讯本次返回的开通说明</p>
      <div class="simulator-options reason-options">
        ${Object.entries(TENCENT_PROCESSING_STATUS_META)
          .map(([code, description]) => `<button class="simulator-option processing" data-action="simulate-processing-status" data-status="${code}">${description}</button>`)
          .join("")}
      </div>`;
  }

  if (stage === "failure") {
    title = "选择失败原因";
    content = `
      <p class="simulator-copy">请选择腾讯本次返回的失败说明</p>
      <div class="simulator-options reason-options">
        ${Object.entries(TENCENT_FAILED_STATUS_META)
          .map(([code, meta]) => `<button class="simulator-option danger" data-action="simulate-failed-status" data-status="${code}"><strong>${meta.description}</strong><span>${meta.reason}</span></button>`)
          .join("")}
      </div>`;
  }

  return `
    <div class="simulator-backdrop" data-action="close-simulator">
      <section class="simulator-sheet" role="dialog" aria-modal="true" aria-labelledby="simulator-title">
        <div class="simulator-heading">
          <h2 id="simulator-title">${title}</h2>
          <button class="simulator-close" data-action="close-simulator" aria-label="关闭">
            <i class="bi bi-b-close" aria-hidden="true"></i>
          </button>
        </div>
        ${content}
      </section>
    </div>`;
}

function renderTaxpayerSelector() {
  if (!window.demoState.taxpayerSelectorOpen) return "";
  return `
    <div class="taxpayer-sheet-backdrop" data-action="close-taxpayer-selector">
      <section class="taxpayer-sheet" role="dialog" aria-modal="true" aria-labelledby="taxpayer-sheet-title">
        <h2 id="taxpayer-sheet-title">选择纳税人类型</h2>
        <div class="taxpayer-sheet-options">
          ${Object.entries(TAXPAYER_TYPE_LABELS)
            .map(([value, label]) => `
              <button class="taxpayer-sheet-option${window.demoState.taxpayerType === value ? " selected" : ""}" data-action="select-taxpayer-type" data-value="${value}">
                <span>${label}</span>
                ${window.demoState.taxpayerType === value ? "<strong>当前选择</strong>" : ""}
              </button>`)
            .join("")}
        </div>
        <button class="taxpayer-sheet-cancel" data-action="close-taxpayer-selector">取消</button>
      </section>
    </div>`;
}

function renderQrPreview() {
  if (!window.demoState.qrPreviewOpen) return "";
  return `
    <div class="dialog-backdrop" data-action="close-qr-preview">
      <section class="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-dialog-title">
        <div class="dialog-heading">
          <h2 id="qr-dialog-title">授权二维码</h2>
          <button class="dialog-close" data-action="close-qr-preview" aria-label="关闭授权二维码弹窗">
            <i class="bi bi-b-close" aria-hidden="true"></i>
          </button>
        </div>
        <img src="${tencentInvitePosterDataUrl()}" alt="腾讯乐企联用授权二维码" />
        <button class="action-button primary" data-action="save-poster-image">保存图片</button>
      </section>
    </div>`;
}

function renderRetryDialog() {
  if (!window.demoState.retryDialogOpen) return "";
  return `
    <div class="dialog-backdrop">
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="retry-title">
        <h2 id="retry-title">重新发起开通</h2>
        <p>请根据失败原因处理完成后再次发起。</p>
        <div class="dialog-actions">
          <button class="action-button secondary" data-action="close-retry-dialog">取消</button>
          <button class="action-button primary" data-action="confirm-retry">确认重试</button>
        </div>
      </section>
    </div>`;
}

function renderPageActions() {
  if (window.demoState.view !== "opening-flow") return "";

  if (window.demoState.scenario === "no-license" || hasCompletedTencentOpening()) return "";

  if (window.demoState.inviteStatus === "idle") {
    return `
      <div class="page-actions single">
        <button class="action-button primary" data-action="start-authorization">去微信授权开通</button>
      </div>`;
  }

  if (window.demoState.inviteStatus === "opening" && !hasCompletedTencentOpening()) {
    return `
      <div class="page-actions two">
        <button class="action-button secondary" data-action="complete-authorization">我已完成</button>
        <button class="action-button primary" data-action="authorize">继续授权</button>
      </div>`;
  }

  if (window.demoState.inviteStatus === "failed") {
    return `
      <div class="page-actions single">
        <button class="action-button primary" data-action="open-retry-dialog">重试</button>
      </div>`;
  }

  if (window.demoState.inviteStatus === "blocked") {
    return `
      <div class="page-actions single">
        <button class="action-button secondary" data-action="reload-invite">重新加载</button>
      </div>`;
  }

  return "";
}

function renderPageContent() {
  if (window.demoState.view === "taxpayer-guide") return renderTaxpayerGuide();
  if (window.demoState.view === "authorization-guide") return renderAuthorizationGuide();
  if (window.demoState.view === "wechat-shop") return renderWechatShopReturn();
  if (window.demoState.scenario === "no-license") {
    return `<section class="empty-state"><h1>暂无法开通</h1><p>未查询到营业执照，暂无法开通数电票</p></section>`;
  }
  if (hasCompletedTencentOpening()) return renderSuccessResult();
  return `
    <div class="opening-sections">
      ${renderInvoiceInfoSection()}
      ${renderTencentOpeningSection()}
    </div>`;
}

function render() {
  const pageActions = renderPageActions();
  document.querySelector("#app").innerHTML = `
    <div class="app-shell">
      ${renderNavBar()}
      <div class="page${pageActions ? " has-actions" : ""}">
        ${renderPageContent()}
        ${pageActions}
        ${renderTaxpayerSelector()}
        ${renderSimulator()}
        ${renderQrPreview()}
        ${renderRetryDialog()}
        ${window.demoState.toast ? `<div class="toast" role="status">${window.demoState.toast}</div>` : ""}
      </div>
    </div>`;
  syncAutoRefresh();
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  const action = trigger?.dataset.action;
  if (!action) return;
  if (trigger.matches("a")) event.preventDefault();

  if (action === "start-authorization") startWechatAuthorization();
  if (action === "open-taxpayer-selector") openTaxpayerSelector();
  if (action === "select-taxpayer-type") selectTaxpayerType(trigger.dataset.value);
  if (action === "close-taxpayer-selector"
    && (trigger === event.target || trigger.classList.contains("taxpayer-sheet-cancel"))) {
    closeTaxpayerSelector();
  }
  if (action === "open-taxpayer-guide") openGuide("taxpayer-guide");
  if (action === "open-authorization-guide") openGuide("authorization-guide");
  if (action === "return-from-guide") returnFromGuide();
  if (action === "authorize") launchWechatMiniProgram();
  if (action === "complete-authorization") completeAuthorization();
  if (action === "open-qr-preview") openQrPreview();
  if (action === "close-qr-preview"
    && (trigger === event.target || trigger.classList.contains("dialog-close"))) {
    closeQrPreview();
  }
  if (action === "save-poster-image") savePosterImage();
  if (action === "open-retry-dialog") openRetryDialog();
  if (action === "close-retry-dialog") closeRetryDialog();
  if (action === "confirm-retry") confirmRetry();
  if (action === "simulate-result") applySimulatedResult(trigger.dataset.result);
  if (action === "simulate-processing-status") applyProcessingStatus(trigger.dataset.status);
  if (action === "simulate-failed-status") applyFailedStatus(trigger.dataset.status);
  if (action === "reload-invite") enterTencentOpening();
  if (action === "exit-opening-flow") exitOpeningFlow();
  if (action === "leave-opening-flow") leaveOpeningFlow();
  if (action === "close-simulator" && (trigger === event.target || trigger.classList.contains("simulator-close"))) {
    closeProgressSimulator();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  queryTencentProgress({ source: "visibility" });
});

window.addEventListener("pagehide", stopAutoRefresh);
window.addEventListener("beforeunload", stopAutoRefresh);

render();
