const $ = (selector) => document.querySelector(selector);

const screenMeta = {
  scenario: ["演示场景", "商户资料设置"],
  store: ["展业 CRM", "门店详情"],
  activation: ["税号激活管理", "数电票激活"],
  "onboarding-home": ["", "新增纳税人"],
  subject: ["", "确认纳税人信息"],
  "subject-manual": ["", "填写纳税人信息"],
  "subject-manual-confirm": ["", "确认纳税人信息"],
  "rpa-form": ["", "添加开票人信息"],
  "invoice-info": ["", "确认开票信息"],
  "invoice-item": ["", "确认开票信息"],
  progress: ["税号开通", "开通进度"],
  "operation-guide": ["", "操作指引"],
  success: ["税号激活管理", "开通结果"],
};

const activationThemeScreens = new Set(["store", "activation"]);

function currentTheme() {
  if (state.screen === "scenario") return "setup";
  return activationThemeScreens.has(state.screen) ? "activation" : "onboarding";
}

const profiles = {
  gas: {
    industry: "加油站",
    storeName: "申城能源静安加油站",
    storeCode: "S10002881",
    merchantNo: "852000003761",
    legalName: "上海申城能源有限公司",
    taxNo: "91310106MA1FY7KX2P",
    wechatMerchantNo: "1905827611",
    address: "上海市静安区共和新路 1688 号",
    phone: "021-66881266",
    bankName: "中国工商银行上海静安支行",
    bankAccount: "1001200104000123456",
  },
  pharmacy: {
    industry: "民营药房",
    storeName: "康宁大药房静安店",
    storeCode: "S10003126",
    merchantNo: "852000004208",
    legalName: "上海康宁医药有限公司",
    taxNo: "91310106MA1G04L95R",
    wechatMerchantNo: "1906204832",
    address: "上海市静安区万航渡路 580 号",
    phone: "021-62180958",
    bankName: "招商银行上海静安寺支行",
    bankAccount: "121900012310806",
  },
  restaurant: {
    industry: "餐饮",
    storeName: "醉拾记静安店",
    storeCode: "S10003627",
    merchantNo: "852000005427",
    legalName: "上海醉拾记餐饮管理有限公司",
    taxNo: "91310106MA1J6H8R2Q",
    wechatMerchantNo: "1906825734",
    address: "上海市静安区南京西路 818 号",
    phone: "021-62586618",
    bankName: "中国银行上海南京西路支行",
    bankAccount: "447758912345",
  },
  other: {
    industry: "其他行业",
    storeName: "云栖商业广场停车场",
    storeCode: "S10003908",
    merchantNo: "852000006519",
    legalName: "上海云栖商业管理有限公司",
    taxNo: "91310106MA1J8P3C6T",
    wechatMerchantNo: "1907319650",
    address: "上海市静安区恒丰路 299 号",
    phone: "021-63533886",
    bankName: "中国建设银行上海闸北支行",
    bankAccount: "31050163200000001234",
  },
};

const activationStatusMeta = {
  unavailable: {
    label: "不可激活",
    tagClass: "neutral",
    icon: "./assets/file-x-2.svg",
    description: "未查询到可用的数电票额度",
  },
  pending: {
    label: "待激活",
    tagClass: "warning",
    icon: "./assets/badge-check.svg",
    description: "有可用额度，待销售确认激活",
  },
  processing: {
    label: "激活中",
    tagClass: "processing",
    icon: "./assets/loader-circle.svg",
    description: "税号正在开通，可继续查看进度",
  },
  active: {
    label: "已激活",
    tagClass: "success",
    icon: "./assets/circle-check-big.svg",
    description: "数电票服务已激活",
  },
  expired: {
    label: "已过期",
    tagClass: "neutral",
    icon: "./assets/clock-alert.svg",
    description: "数电票服务已过有效期",
  },
};

function initialState() {
  return {
    screen: "scenario",
    stack: [],
    merchantType: null,
    industry: null,
    activationStatus: "pending",
    openingSubmitted: false,
    subjectSame: null,
    taxpayerConfirmed: false,
    issuerConfirmed: false,
    invoiceInfoConfirmed: false,
    invoiceItemExpanded: false,
    manualLegalName: "",
    manualTaxNo: "",
    oilBusiness: null,
    propertyBusiness: null,
    plan: null,
    wechatMerchantNo: "",
    wechatStage: 0,
    wechatQrGenerated: false,
    wechatStatus: "",
    wechatFailureStage: null,
    wechatFailureReason: "",
    alipayProductStatuses: {
      basic: "NOT_STARTED",
      oil: "NOT_STARTED",
      property: "NOT_STARTED",
    },
    rpaStage: 0,
    sheetAction: null,
    sheetLink: "",
    pendingRestart: null,
    operationGuideType: "",
  };
}

const state = initialState();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function copyText(value) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value).catch(() => {});
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function currentProfile() {
  const base = profiles[state.industry] || profiles.other;
  if (state.merchantType !== "micro") return base;
  return {
    ...base,
    storeName: `陈记便利店${base.industry === "其他行业" ? "" : `·${base.industry}场景`}`,
    storeCode: "S10001866",
    merchantNo: "852000001866",
    legalName: "未查询到营业执照",
    taxNo: "-",
    wechatMerchantNo: "1904061866",
    address: "上海市静安区昌平路 286 号",
  };
}

function leqiPlanForIndustry() {
  if (state.industry === "gas") return "leqi-wechat";
  return "rpa";
}

function determinePlan() {
  if (state.merchantType === "micro" || state.subjectSame === false) return "rpa";
  return leqiPlanForIndustry();
}

function planTitle() {
  if (state.plan === "leqi-wechat") return "腾讯乐企联用";
  if (state.plan === "leqi-both") return "腾讯 + 支付宝乐企联用";
  return "企享云 RPA";
}

function activationMeta() {
  return activationStatusMeta[state.activationStatus] || activationStatusMeta.pending;
}

function activationTaxNo() {
  const profile = currentProfile();
  return profile.taxNo === "-" ? "91310106MA1R8M6F8X" : profile.taxNo;
}

function prepareActivationPreset() {
  if (state.activationStatus !== "active" && state.activationStatus !== "expired") return;
  state.subjectSame = state.merchantType === "enterprise" ? true : null;
  state.oilBusiness = state.industry === "gas";
  state.propertyBusiness = false;
  state.plan = state.merchantType === "micro" ? "rpa" : leqiPlanForIndustry();
  state.wechatStage = 3;
  state.wechatStatus = "ENABLED";
  state.alipayProductStatuses = {
    basic: "ACTIVATION_SUCCESS",
    oil: "ACTIVATION_SUCCESS",
    property: "ACTIVATION_SUCCESS",
  };
  state.rpaStage = 4;
}

function go(screen, push = true) {
  if (push && state.screen !== screen) state.stack.push(state.screen);
  state.screen = screen;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function goProgress() {
  state.stack = ["store", "activation", "onboarding-home"];
  state.screen = "progress";
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function back() {
  const previous = state.stack.pop();
  if (!previous) return;
  state.screen = previous;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function resetDownstream() {
  state.subjectSame = null;
  state.openingSubmitted = false;
  state.taxpayerConfirmed = false;
  state.issuerConfirmed = false;
  state.invoiceInfoConfirmed = false;
  state.invoiceItemExpanded = false;
  state.manualLegalName = "";
  state.manualTaxNo = "";
  state.oilBusiness = null;
  state.propertyBusiness = null;
  state.plan = null;
  state.wechatMerchantNo = currentProfile().wechatMerchantNo;
  state.wechatStage = 0;
  state.wechatQrGenerated = false;
  state.wechatStatus = "";
  state.wechatFailureStage = null;
  state.wechatFailureReason = "";
  state.alipayProductStatuses = {
    basic: "NOT_STARTED",
    oil: "NOT_STARTED",
    property: "NOT_STARTED",
  };
  state.rpaStage = 0;
}

function taxpayerName() {
  if (state.subjectSame === false || state.merchantType === "micro") return state.manualLegalName || "待填写";
  return currentProfile().legalName;
}

function taxpayerNo() {
  if (state.subjectSame === false || state.merchantType === "micro") return state.manualTaxNo || "待填写";
  return currentProfile().taxNo;
}

function queryTaxpayerByTaxNo(taxNo) {
  const normalized = taxNo.trim().toUpperCase();
  if (!/^[0-9A-Z]{18}$/.test(normalized) || normalized === "999999999999999999") return null;
  if (normalized === "92370104MA3QG053X9") return { legalName: "济南槐荫醉拾记家常菜馆", taxNo: normalized };
  if (normalized === "91310106MA1R8M6F8X") return { legalName: "上海陈记商贸中心", taxNo: normalized };
  return { legalName: "上海悦投贸易有限公司", taxNo: normalized };
}

function finishSubjectConfirmation() {
  state.plan = determinePlan();
  state.taxpayerConfirmed = true;
  if (state.plan === "rpa") {
    go("rpa-form");
    return;
  }
  state.oilBusiness = true;
  state.propertyBusiness = false;
  state.openingSubmitted = true;
  goProgress();
}

function finishRpaSubjectConfirmation() {
  state.plan = "rpa";
  state.taxpayerConfirmed = true;
  go("rpa-form");
}

function renderHeader() {
  const [eyebrow, defaultTitle] = screenMeta[state.screen] || screenMeta.store;
  const title = state.screen === "progress" ? (state.plan === "rpa" ? "RPA 开通" : "乐企联用") : defaultTitle;
  const canBack = state.stack.length > 0 && state.screen !== "scenario";
  $("#appHeader").innerHTML = `
    ${
      canBack
        ? '<button class="icon-button" data-action="back" aria-label="返回"><img src="./assets/chevron-left.svg" alt="" /></button>'
        : '<span class="header-spacer" aria-hidden="true"></span>'
    }
    <div class="header-copy">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(eyebrow)}</p>
    </div>
    <span class="header-spacer" aria-hidden="true"></span>
  `;
}

function optionCard(field, value, title, extra) {
  const selected = state[field] === value;
  return `
    <button class="option-card${selected ? " selected" : ""}" data-action="select-option" data-field="${field}" data-value="${value}" aria-pressed="${selected}">
      <span class="radio-mark" aria-hidden="true"></span>
      <span class="option-copy">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(extra)}</span>
      </span>
    </button>
  `;
}

function segmented(field, yesLabel = "是", noLabel = "否") {
  return `
    <div class="segmented" role="radiogroup">
      <button class="segment-button${state[field] === true ? " selected" : ""}" data-action="select-option" data-field="${field}" data-value="true" role="radio" aria-checked="${state[field] === true}">${escapeHtml(yesLabel)}</button>
      <button class="segment-button${state[field] === false ? " selected" : ""}" data-action="select-option" data-field="${field}" data-value="false" role="radio" aria-checked="${state[field] === false}">${escapeHtml(noLabel)}</button>
    </div>
  `;
}

function footer(primaryText, primaryAction, disabled = false, secondaryText = "", secondaryAction = "") {
  return `
    <div class="footer-actions${secondaryText ? "" : " single"}">
      ${secondaryText ? `<button class="button tertiary" data-action="${secondaryAction}">${escapeHtml(secondaryText)}</button>` : ""}
      <button class="button primary" data-action="${primaryAction}"${disabled ? " disabled" : ""}>${escapeHtml(primaryText)}</button>
    </div>
  `;
}

function renderScenario() {
  const ready = Boolean(state.merchantType && state.industry);
  return `
    <section class="screen">
      <div class="page-intro">
        <p class="eyebrow">数电票开通 Demo</p>
        <h2>选择演示商户</h2>
        <p>以下信息用于生成商户资料，并决定后续开通路径。</p>
      </div>

      <div class="section-block">
        <div class="section-heading">
          <div>
            <h3>商户类型</h3>
            <p>模拟商户中心的营业执照查询结果</p>
          </div>
        </div>
        <div class="option-stack">
          ${optionCard("merchantType", "micro", "小微商户", "无营业执照，进入 RPA 开通")}
          ${optionCard("merchantType", "enterprise", "企业商户", "有营业执照，继续判断乐企联用条件")}
        </div>
      </div>

      <div class="section-block">
        <div class="section-heading">
          <div>
            <h3>商户行业</h3>
            <p>MVP 仅加油站行业使用腾讯乐企联用</p>
          </div>
        </div>
        <div class="option-grid">
          ${optionCard("industry", "gas", "加油站", "腾讯乐企联用")}
          ${optionCard("industry", "other", "其他行业", "企享云 RPA")}
        </div>
      </div>

      <div class="section-block">
        <div class="section-heading">
          <div>
            <h3>激活状态</h3>
            <p>模拟税号激活管理的当前状态</p>
          </div>
        </div>
        <div class="option-grid activation-option-grid">
          ${optionCard("activationStatus", "unavailable", "不可激活", "无可用额度")}
          ${optionCard("activationStatus", "pending", "待激活", "主流程起点")}
          ${optionCard("activationStatus", "processing", "激活中", "继续税号进件")}
          ${optionCard("activationStatus", "active", "已激活", "服务正在生效")}
          ${optionCard("activationStatus", "expired", "已过期", "服务已过有效期")}
        </div>
      </div>
      ${footer("生成演示商户", "start-scenario", !ready)}
    </section>
  `;
}

function renderStore() {
  const profile = currentProfile();
  const activation = activationMeta();
  return `
    <section class="screen no-footer">
      <div class="summary-band">
        <div class="summary-top">
          <div>
            <p class="eyebrow">${state.merchantType === "micro" ? "小微商户" : "企业商户"}</p>
            <h2>${escapeHtml(profile.storeName)}</h2>
            <p>${escapeHtml(profile.address)}</p>
          </div>
          <span class="status-tag ${activation.tagClass}">${activation.label}</span>
        </div>
      </div>

      <div class="section-block">
        <div class="section-heading">
          <h3>门店信息</h3>
          <span class="plain-tag">${escapeHtml(profile.industry)}</span>
        </div>
        <dl class="info-list">
          <div class="list-row"><dt>门店编号</dt><dd>${escapeHtml(profile.storeCode)}</dd></div>
          <div class="list-row"><dt>收钱吧商户号</dt><dd>${escapeHtml(profile.merchantNo)}</dd></div>
          <div class="list-row"><dt>商户类型</dt><dd>${state.merchantType === "micro" ? "小微商户" : "企业商户"}</dd></div>
          <div class="list-row"><dt>所属行业</dt><dd>${escapeHtml(profile.industry)}</dd></div>
        </dl>
      </div>

      <div class="section-block">
        <div class="section-heading"><h3>产品服务</h3></div>
        <button class="feature-row" data-action="open-invoice">
          <span class="feature-icon"><img src="./assets/receipt-text.svg" alt="" /></span>
          <span class="feature-copy">
            <strong>数电票开通</strong>
            <span>${activation.description}</span>
          </span>
          <span class="feature-arrow"><img src="./assets/chevron-right.svg" alt="" /></span>
        </button>
      </div>
    </section>
  `;
}

function renderActivation() {
  const profile = currentProfile();
  const activation = activationMeta();

  if (state.activationStatus === "unavailable") {
    return `
      <section class="screen activation-screen">
        <div class="activation-state-panel muted">
          <div class="activation-state-icon"><img src="${activation.icon}" alt="" /></div>
          <h2>${activation.label}</h2>
          <p>未查询到可用的数电票额度，暂时无法激活。</p>
        </div>
        ${footer("返回门店详情", "return-store")}
      </section>
    `;
  }

  if (state.activationStatus === "pending") {
    return `
      <section class="screen activation-screen">
        <div class="activation-state-panel pending">
          <div class="activation-state-icon"><img src="${activation.icon}" alt="" /></div>
          <h2>${activation.label}</h2>
          <p>确认消耗 1 个数电票额度，为该门店激活数电票服务？</p>
        </div>
        <div class="activation-detail-card compact">
          <div><span>额度归属</span><strong>当前商户</strong></div>
          <div><span>可用额度</span><strong>1 个税号</strong></div>
        </div>
        ${footer("确认激活", "start-activation", false, "返回", "return-store")}
      </section>
    `;
  }

  if (state.activationStatus === "processing") {
    const hasProgress = state.openingSubmitted;
    return `
      <section class="screen activation-screen">
        <div class="activation-state-panel processing">
          <div class="activation-state-icon"><img src="${activation.icon}" alt="" /></div>
          <h2>${activation.label}</h2>
          <p>${hasProgress ? "税号已进入通道开通，请继续查看并引导商户完成。" : "请继续完善税号开通信息。"}</p>
        </div>
        <div class="activation-detail-card compact">
          <div><span>额度状态</span><strong>已冻结</strong></div>
          <div><span>当前阶段</span><strong>${hasProgress ? "通道开通" : "税号通用进件"}</strong></div>
        </div>
        ${footer(hasProgress ? "查看开通进度" : "继续完善信息", hasProgress ? "resume-progress" : "start-activation")}
      </section>
    `;
  }

  if (state.activationStatus === "active") {
    return `
      <section class="screen activation-screen">
        <div class="activation-state-panel active">
          <div class="activation-state-icon"><img src="${activation.icon}" alt="" /></div>
          <h2>${activation.label}</h2>
          <p>服务有效期至 2027-07-09 23:59:59</p>
        </div>
        <div class="activation-detail-card">
          <div><span>纳税人名称</span><strong>${escapeHtml(profile.legalName === "未查询到营业执照" ? "上海陈记商贸中心" : profile.legalName)}</strong></div>
          <div><span>税号</span><strong>${escapeHtml(activationTaxNo())}</strong></div>
          <div><span>开通方式</span><strong>${escapeHtml(planTitle())}</strong></div>
        </div>
        ${footer("查看开通结果", "show-success")}
      </section>
    `;
  }

  return `
    <section class="screen activation-screen">
      <div class="activation-state-panel muted">
        <div class="activation-state-icon"><img src="${activation.icon}" alt="" /></div>
        <h2>${activation.label}</h2>
        <p>服务有效期至 2026-06-30 23:59:59</p>
      </div>
      ${footer("返回门店详情", "return-store")}
    </section>
  `;
}

function taskStep(number, title, stateName, note = "") {
  const marker = stateName === "done" ? '<img src="./assets/check.svg" alt="" />' : String(number).padStart(2, "0");
  return `
    <div class="task-step ${stateName}">
      <span class="task-marker">${marker}</span>
      <div class="task-card">
        <div><strong>${escapeHtml(title)}</strong>${note ? `<span>${escapeHtml(note)}</span>` : ""}</div>
        ${stateName === "current" ? '<img class="task-arrow" src="./assets/chevron-right.svg" alt="" />' : ""}
      </div>
    </div>
  `;
}

function onboardingNextStep() {
  if (!state.taxpayerConfirmed) return 1;
  if (state.plan === "rpa" && !state.issuerConfirmed) return 2;
  if (state.plan && state.plan !== "rpa" && !isOpeningComplete()) return 2;
  return 3;
}

function renderOnboardingHome() {
  const next = onboardingNextStep();
  const isLeqi = state.plan && state.plan !== "rpa";
  const stepTwoTitle = !state.plan
    ? "选择开通方式"
    : isLeqi
      ? `腾讯乐企联用开通`
      : "添加开票人信息";
  const stepTwoState = next === 2 ? "current" : next > 2 ? "done" : "pending";
  return `
    <section class="screen onboarding-task-screen">
      <div class="task-list">
        ${taskStep(1, "确认纳税人信息", next === 1 ? "current" : "done", state.taxpayerConfirmed ? taxpayerName() : "核对开票主体")}
        ${taskStep(2, stepTwoTitle, stepTwoState, next > 2 ? "已完成" : "")}
        ${taskStep(3, "确认开票信息", next === 3 ? "current" : "pending", state.invoiceInfoConfirmed ? "已完成" : "")}
      </div>
      ${footer("去操作", "open-current-step")}
    </section>
  `;
}

function renderSubject() {
  const profile = currentProfile();
  return `
    <section class="screen no-footer subject-screen">
      <div class="section-block form-card subject-card">
        <div class="subject-card-title">商户营业执照</div>
        <div class="taxpayer-summary license-summary">
          <span>名称</span><strong>${escapeHtml(profile.legalName)}</strong>
          <span>统一社会信用代码</span><strong>${escapeHtml(profile.taxNo)}</strong>
        </div>
        <div class="subject-prompt">是否使用收钱吧商户的营业执照信息？</div>
        <div class="subject-choice-actions">
          <button class="button primary" data-action="use-merchant-license">确认使用</button>
          <button class="button tertiary" data-action="use-other-license">不使用</button>
        </div>
      </div>
    </section>
  `;
}

function renderSubjectManual() {
  return `
    <section class="screen">
      <div class="page-intro simple"><h2>填写纳税人信息</h2></div>
      <div class="section-block form-card manual-query-card">
        <label class="field">
          <span class="field-label">统一社会信用代码 <em>必填</em></span>
          <input class="input" id="manualTaxNo" value="${escapeHtml(state.manualTaxNo)}" placeholder="请输入统一社会信用代码" autocomplete="off" />
        </label>
        <div class="manual-query-divider"></div>
        <h3 class="form-section-title">快速填写</h3>
        <p class="manual-query-help">支持上传营业执照识别统一社会信用代码</p>
        <button class="upload-button" type="button" data-action="mock-upload-license">上传营业执照</button>
      </div>
      ${footer("查询", "query-taxpayer", !state.manualTaxNo.trim())}
    </section>
  `;
}

function renderSubjectManualConfirm() {
  return `
    <section class="screen no-footer subject-screen">
      <div class="section-block form-card subject-card">
        <div class="confirm-card-title">核对信息</div>
        <div class="taxpayer-summary confirm-summary">
          <span>名称</span><strong>${escapeHtml(state.manualLegalName)}</strong>
          <span>统一社会信用代码</span><strong>${escapeHtml(state.manualTaxNo)}</strong>
        </div>
        <div class="subject-prompt">是否使用以上企业信息开票？</div>
        <div class="subject-choice-actions">
          <button class="button primary" data-action="confirm-manual-taxpayer">确认使用</button>
          <button class="button tertiary" data-action="retry-manual-taxpayer">不使用</button>
        </div>
      </div>
    </section>
  `;
}

function renderRpaForm() {
  return `
    <section class="screen">
      <div class="page-intro simple"><h2>填写开票人信息</h2></div>

      <form class="section-block">
        <label class="field">
          <span class="field-label">开票人角色</span>
          <select class="select"><option>法定代表人</option><option selected>财务负责人</option><option>开票员</option></select>
        </label>
        <label class="field">
          <span class="field-label">姓名</span>
          <input class="input" value="王丽" autocomplete="name" />
        </label>
        <label class="field">
          <span class="field-label">税局登录手机号</span>
          <input class="input" value="13888886666" inputmode="tel" autocomplete="tel" />
        </label>
        <label class="field">
          <span class="field-label">税局登录密码</span>
          <input class="input" type="password" value="12345678" autocomplete="current-password" />
        </label>
        <label class="field">
          <span class="field-label">短信验证码</span>
          <span class="input-action">
            <input class="input" value="826104" inputmode="numeric" />
            <button class="mini-button" type="button" data-action="get-code">获取验证码</button>
          </span>
        </label>
      </form>
      ${footer("保存", "submit-rpa")}
    </section>
  `;
}

function requiredMark() {
  return '<i class="required-mark">*</i>';
}

function renderInvoiceInfo() {
  const profile = currentProfile();
  return `
    <section class="screen invoice-review-screen">
      <div class="page-intro simple invoice-review-intro">
        <h2>请核实销售方信息</h2>
        <p>销售方信息将用于开票，已为您智能填充，请确认并完善</p>
      </div>
      <div class="section-block form-card invoice-review-card">
        <div class="taxpayer-identity">
          <strong>${escapeHtml(taxpayerName())}</strong>
          <span>${escapeHtml(taxpayerNo())}</span>
        </div>
        <label class="review-row">
          <span>纳税人类型 ${requiredMark()}</span>
          <select class="review-control select-chevron"><option>小规模纳税人</option><option>一般纳税人</option></select>
        </label>
        <label class="review-row"><span>地址</span><textarea class="review-control review-textarea" placeholder="请输入">${escapeHtml(profile.address)}</textarea></label>
        <label class="review-row"><span>电话</span><input class="review-control" value="${escapeHtml(profile.phone)}" placeholder="请输入" inputmode="tel" /></label>
        <label class="review-row"><span>开户行</span><input class="review-control" value="${escapeHtml(profile.bankName)}" placeholder="请输入" /></label>
        <label class="review-row"><span>开户行账号</span><input class="review-control" value="${escapeHtml(profile.bankAccount)}" placeholder="请输入" inputmode="numeric" /></label>
      </div>
      ${footer("下一步", "invoice-seller-next")}
    </section>
  `;
}

function renderInvoiceItem() {
  return `
    <section class="screen invoice-review-screen">
      <div class="page-intro simple invoice-review-intro">
        <h2>请核实开票项目信息</h2>
        <p>已根据您的行业智能填充信息，该信息将作为后续开票的默认项目，请仔细确认</p>
      </div>
      <div class="section-block form-card invoice-review-card invoice-item-card">
        <label class="review-row"><span>项目名称 ${requiredMark()}</span><input class="review-control" value="生活服务" /></label>
        <label class="review-row"><span>税收分类编码 ${requiredMark()}</span><input class="review-control" value="1010101000000000001" inputmode="numeric" /></label>
        <label class="review-row"><span>税率 ${requiredMark()}</span><select class="review-control select-chevron"><option>3%</option><option>6%</option><option>9%</option><option>13%</option></select></label>
        ${
          state.invoiceItemExpanded
            ? `
              <label class="review-row"><span>规格型号</span><input class="review-control" placeholder="请输入" /></label>
              <label class="review-row"><span>单位</span><input class="review-control" value="件" placeholder="请输入" /></label>
            `
            : ""
        }
        <button class="invoice-expand-button" type="button" data-action="toggle-invoice-item-expand">
          ${state.invoiceItemExpanded ? "收起" : "展开"}<span class="expand-chevron${state.invoiceItemExpanded ? " expanded" : ""}"></span>
        </button>
      </div>
      ${footer("下一步", "submit-invoice-info")}
    </section>
  `;
}

function timeline(steps, current, locked = false) {
  return `
    <div class="timeline">
      ${steps
        .map((step, index) => {
          const done = !locked && index < current;
          const isCurrent = !locked && index === current && current < steps.length;
          return `
            <div class="timeline-item${done ? " done" : isCurrent ? " current" : ""}">
              <span class="timeline-dot">${done ? '<img src="./assets/check.svg" alt="" />' : ""}</span>
              <div class="timeline-copy">
                <strong>${escapeHtml(step[0])}</strong>
                <span>${escapeHtml(step[1])}</span>
                ${step[2] ? `<div class="timeline-step-action">${step[2]}</div>` : ""}
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

const wechatProcessingStatusMeta = {
  APPROVAL_PENDING: "请等待当地税务机关审批",
  ACCESS_CONFIRMED_PENDING: "请商户法定代表人/财务负责人登录电子税局或国家税务总局乐企数字开放平台进行确认",
  ABILITY_CONFIRMED_PENDING: "请商户法定代表人/财务负责人登录电子税局进行能力授权确认",
  BILLING_PERSON_REGISTER_PENDING: "请商户法定代表人/财务负责人登录电子税局进行开票员设置",
  BILLING_PERSON_CONFIRMED_PENDING: "请开票员登录电子税局-乐企进行授权",
  SECURITY_SETTING_PENDING: "请商户法定代表人/财务负责人登录电子税局设置开票安全验证有效期",
};

const wechatFailedStatusMeta = {
  MCH_INVITE_FAILED: {
    description: "商户邀请开通失败",
    reason: "单位信息有误，请确认微信支付平台和税务局登记主体信息一致",
  },
  APPLY_FAILED: {
    description: "税局申请不通过，请查看接入失败原因",
    reason: "当地税务机关未通过本次数电发票接入申请",
  },
  DISABLED: {
    description: "未接入或商户解除授权，请重新发起能力邀请商户确认授权",
    reason: "商户当前未接入，或已在税局解除服务商授权",
  },
  RESOURCE_EXPIRED: {
    description: "商户使用的数电服务商资源过期，请联系数电服务商",
    reason: "当前数电服务商资源已超过有效期",
  },
};

function renderWechatCard() {
  const failedMeta = wechatFailedStatusMeta[state.wechatStatus];
  const failed = Boolean(failedMeta);
  const complete = state.wechatStatus === "ENABLED";
  const status = complete ? "success" : failed ? "failed" : state.wechatQrGenerated ? "opening" : "pending";
  const statusMeta = abilityDisplayStatus(status);
  let guidance = "请微信商户超级管理员使用个人微信扫码完成开通";
  let detail = "";
  let actions = '<button class="button secondary block" data-action="open-wechat-auth">生成开通二维码</button>';
  if (status === "opening") {
    guidance = wechatProcessingStatusMeta[state.wechatStatus] || "请微信商户超级管理员使用个人微信扫码完成开通";
    actions = '<div class="step-button-row"><button class="button tertiary" data-action="open-wechat-auth">查看二维码</button><button class="button secondary" data-action="open-refresh-simulator" data-context="wechat-opening">刷新进度</button></div>';
  }
  if (status === "failed") {
    guidance = failedMeta.description;
    detail = `<div class="notice danger step-failure-notice"><span class="notice-mark">!</span><span>${escapeHtml(state.wechatFailureReason || failedMeta.reason)}</span></div>`;
    actions = '<button class="button secondary block" data-action="regenerate-wechat-auth">重新发起开通</button>';
  }
  if (status === "success") {
    guidance = "腾讯乐企联用已开通";
    actions = "";
  }
  return `
    <article class="channel-card wechat${complete ? " complete" : ""}">
      <div class="channel-heading">
        <div><h3>腾讯乐企联用</h3><p>商户号 ${escapeHtml(state.wechatMerchantNo)}</p></div>
        <span class="status-tag ${statusMeta.tagClass}">${statusMeta.label}</span>
      </div>
      <div class="ability-status-content">
        <p class="ability-guidance">${escapeHtml(guidance)}</p>
        ${detail}
        ${actions ? `<div class="ability-actions">${actions}</div>` : ""}
        ${complete ? "" : '<button class="guide-link-button" data-action="open-operation-guide" data-guide="wechat">查看操作指引</button>'}
      </div>
    </article>
  `;
}

function renderTencentLeqiWorkspace() {
  const failedMeta = wechatFailedStatusMeta[state.wechatStatus];
  const failed = Boolean(failedMeta);
  const complete = state.wechatStatus === "ENABLED";
  const status = complete ? "success" : failed ? "failed" : state.wechatQrGenerated ? "opening" : "pending";
  const statusMeta = abilityDisplayStatus(status);
  const processingGuidance = wechatProcessingStatusMeta[state.wechatStatus];
  const statusGuidance = processingGuidance || "请微信商户超级管理员使用个人微信扫码完成开通";

  let mainContent = `
    <div class="tencent-leqi-state pending">
      <h2>开通腾讯乐企联用</h2>
      <p>请微信商户超级管理员使用个人微信扫码完成开通</p>
      <button class="button secondary tencent-primary-action" data-action="open-wechat-auth">生成开通二维码</button>
      <button class="guide-link-button" data-action="open-operation-guide" data-guide="wechat">查看操作指引</button>
    </div>
  `;

  if (status === "opening") {
    mainContent = `
      <div class="tencent-leqi-state opening">
        <div class="wechat-access-status">
          <span>当前开通状态</span>
          <p>${escapeHtml(statusGuidance)}</p>
        </div>
        <div class="tencent-inline-qr">
          <img class="tencent-qr-poster" src="${tencentQrPosterDataUrl()}" alt="腾讯乐企联用开通二维码" />
        </div>
        <button class="button secondary tencent-primary-action" data-action="open-refresh-simulator" data-context="wechat-opening">刷新进度</button>
        <button class="guide-link-button" data-action="open-operation-guide" data-guide="wechat">查看操作指引</button>
      </div>
    `;
  }

  if (status === "failed") {
    mainContent = `
      <div class="tencent-leqi-state failed">
        <div class="tencent-state-symbol danger">!</div>
        <h2>${escapeHtml(failedMeta.description)}</h2>
        <div class="notice danger step-failure-notice"><span class="notice-mark">!</span><span>${escapeHtml(state.wechatFailureReason || failedMeta.reason)}</span></div>
        <button class="button secondary tencent-primary-action" data-action="regenerate-wechat-auth">重新发起开通</button>
        <button class="guide-link-button" data-action="open-operation-guide" data-guide="wechat">查看操作指引</button>
      </div>
    `;
  }

  if (status === "success") {
    mainContent = `
      <div class="tencent-leqi-state success">
        <div class="tencent-state-symbol"><img src="./assets/circle-check-big.svg" alt="" /></div>
        <h2>腾讯乐企联用已开通</h2>
        <p class="tencent-success-merchant">微信商户号 ${escapeHtml(state.wechatMerchantNo)}</p>
      </div>
    `;
  }

  return `
    <div class="tencent-leqi-workspace">
      ${
        complete
          ? ""
          : `<div class="tencent-leqi-heading">
              <div>
                <h1>腾讯乐企联用</h1>
                <p>商户号 ${escapeHtml(state.wechatMerchantNo)}</p>
              </div>
              <span class="status-tag ${statusMeta.tagClass}">${statusMeta.label}</span>
            </div>`
      }
      <div class="tencent-leqi-main">${mainContent}</div>
    </div>
  `;
}

const alipayProductMeta = {
  basic: { title: "支付宝基础开票能力", productCode: "NORMAL_INVOICE" },
  oil: { title: "支付宝成品油开票能力", productCode: "REFINED_OIL_INVOICE" },
  property: { title: "支付宝不动产租赁开票能力", productCode: "REAL_PROPERTY_BUSINESS_INVOICE" },
};

function abilityDisplayStatus(status) {
  const statuses = {
    pending: { label: "待开通", tagClass: "warning" },
    opening: { label: "开通中", tagClass: "processing" },
    success: { label: "开通成功", tagClass: "success" },
    failed: { label: "开通失败", tagClass: "danger" },
  };
  return statuses[status] || statuses.pending;
}

function alipayAbilityStatus(status) {
  if (status === "ACTIVATION_SUCCESS") return "success";
  if (["AUTH_FAIL", "AUDIT_FAIL", "ACTIVATION_FAIL"].includes(status)) return "failed";
  if (["AUTH_PENDING", "WAIT_AUDIT", "AUTH_SUCCESS"].includes(status)) return "opening";
  return "pending";
}

function renderAlipayProductCard(code, locked = false) {
  const product = alipayProductMeta[code];
  const status = state.alipayProductStatuses[code];
  const abilityStatus = alipayAbilityStatus(status);
  const statusMeta = abilityDisplayStatus(abilityStatus);
  const complete = abilityStatus === "success";
  let guidance = locked ? "完成基础开票开通后，可继续开通当前能力" : "请商家法人或财务负责人使用支付宝 App 扫码完成开通";
  let detail = "";
  let actions = `<button class="button secondary block" data-action="open-alipay-product-qr" data-product="${code}"${locked ? " disabled" : ""}>${locked ? "请先完成支付宝基础开票开通" : "生成开通二维码"}</button>`;
  if (abilityStatus === "opening") {
    guidance = "商家正在支付宝 App 中办理，请稍后刷新进度";
    actions = `<div class="step-button-row"><button class="button tertiary" data-action="open-alipay-product-qr" data-product="${code}">查看二维码</button><button class="button secondary" data-action="open-refresh-simulator" data-context="alipay-opening" data-product="${code}">刷新进度</button></div>`;
  }
  if (abilityStatus === "failed") {
    guidance = `${product.title}开通失败`;
    detail = `<div class="notice danger step-failure-notice"><span class="notice-mark">!</span><span>${escapeHtml(status)}</span></div>`;
    actions = `<button class="button secondary block" data-action="restart-alipay-product" data-product="${code}">重新发起开通</button>`;
  }
  if (abilityStatus === "success") {
    guidance = `${product.title}已开通`;
    actions = "";
  }
  return `
    <article class="channel-card alipay${complete ? " complete" : ""}">
      <div class="channel-heading">
        <div><h3>${escapeHtml(product.title)}</h3><p>税号 ${escapeHtml(taxpayerNo())}</p></div>
        <span class="status-tag ${statusMeta.tagClass}">${statusMeta.label}</span>
      </div>
      <div class="ability-status-content">
        <p class="ability-guidance">${escapeHtml(guidance)}</p>
        ${detail}
        ${actions ? `<div class="ability-actions">${actions}</div>` : ""}
        ${complete ? "" : `<button class="guide-link-button" data-action="open-operation-guide" data-guide="alipay-${escapeHtml(code)}">查看操作指引</button>`}
      </div>
    </article>
  `;
}

function renderRpaCard() {
  const steps = [
    ["资料已提交", "开票人资料已提交企享云"],
    ["通道开通", "系统正在完成税局连接和配置"],
    ["验证开票", "通道执行开票能力验证"],
    ["开通完成", "税号已具备真实开票能力"],
  ];
  const complete = state.rpaStage >= steps.length;
  return `
    <article class="channel-card rpa${complete ? " complete" : ""}">
      <div class="channel-heading">
        <div><h3>企享云 RPA</h3><p>覆盖当前税号的全部交易</p></div>
        <span class="status-tag ${complete ? "success" : "processing"}">${complete ? "已完成" : "开通中"}</span>
      </div>
      ${timeline(steps, state.rpaStage)}
      ${
        complete
          ? ""
          : '<div class="card-action"><button class="button secondary block" data-action="refresh-rpa">刷新开通进度</button></div>'
      }
    </article>
  `;
}

function isOpeningComplete() {
  if (state.plan === "rpa") return state.rpaStage >= 4;
  if (state.plan === "leqi-wechat") return state.wechatStage >= 3;
  if (state.wechatStage < 3) return false;
  const requiredProducts = ["basic"];
  if (state.oilBusiness) requiredProducts.push("oil");
  if (state.propertyBusiness) requiredProducts.push("property");
  return requiredProducts.every((code) => state.alipayProductStatuses[code] === "ACTIVATION_SUCCESS");
}

function renderProgress() {
  const complete = isOpeningComplete();
  if (state.plan === "leqi-wechat") {
    return `
      <section class="screen tencent-leqi-screen${complete ? "" : " no-footer"}">
        ${renderTencentLeqiWorkspace()}
        ${complete ? footer("继续确认开票信息", "finish-opening") : ""}
      </section>
    `;
  }
  const cards = [];
  if (state.plan === "rpa") {
    cards.push(renderRpaCard());
  } else {
    cards.push(renderWechatCard());
    if (state.plan === "leqi-both") {
      cards.push(renderAlipayProductCard("basic"));
      const basicComplete = state.alipayProductStatuses.basic === "ACTIVATION_SUCCESS";
      if (state.oilBusiness) cards.push(renderAlipayProductCard("oil", !basicComplete));
      if (state.propertyBusiness) cards.push(renderAlipayProductCard("property", !basicComplete));
    }
  }
  return `
    <section class="screen${complete ? "" : " no-footer"}">
      <div class="section-block channel-section">
        <div class="channel-stack">${cards.join("")}</div>
      </div>
      ${complete ? footer(state.plan === "rpa" ? "查看开通结果" : "继续确认开票信息", "finish-opening") : ""}
    </section>
  `;
}

const operationGuideMeta = {
  wechat: {
    title: "腾讯乐企联用操作指引",
    audience: "微信商户超级管理员",
    materialTitle: "微信扫码开通操作指引",
  },
  "alipay-basic": {
    title: "支付宝基础开票能力操作指引",
    audience: "商家法定代表人或财务负责人",
    materialTitle: "支付宝基础开票能力操作指引",
  },
  "alipay-oil": {
    title: "支付宝成品油开票能力操作指引",
    audience: "商家法定代表人或财务负责人",
    materialTitle: "支付宝成品油开票能力操作指引",
  },
  "alipay-property": {
    title: "支付宝不动产经营租赁开票能力操作指引",
    audience: "商家法定代表人或财务负责人",
    materialTitle: "支付宝不动产经营租赁开票能力操作指引",
  },
};

function renderOperationGuide() {
  const guide = operationGuideMeta[state.operationGuideType] || operationGuideMeta.wechat;
  return `
    <section class="screen operation-guide-screen">
      <div class="page-intro simple">
        <h2>${escapeHtml(guide.title)}</h2>
        <p>适用人员：${escapeHtml(guide.audience)}</p>
      </div>
      <div class="section-block guide-media-card">
        <div class="guide-media-placeholder" role="img" aria-label="${escapeHtml(guide.materialTitle)}素材占位">
          <span>操作指引</span>
          <strong>${escapeHtml(guide.materialTitle)}</strong>
          <p>图片或视频素材待配置</p>
        </div>
      </div>
    </section>
  `;
}

function renderSuccess() {
  const profile = currentProfile();
  return `
    <section class="screen">
      <div class="result-hero">
        <div class="result-symbol"><img src="./assets/circle-check-big.svg" alt="" /></div>
        <h2>数电票已开通</h2>
        <p>${escapeHtml(profile.storeName)}</p>
      </div>
      <div class="section-block">
        <div class="section-heading"><h3>开通结果</h3><span class="status-tag success">已开通</span></div>
        <dl class="result-list">
          <div class="result-row"><dt>税号</dt><dd>${escapeHtml(taxpayerNo())}</dd></div>
          <div class="result-row"><dt>开票模式</dt><dd>${state.plan === "rpa" ? "RPA" : "乐企联用"}</dd></div>
          <div class="result-row"><dt>开通通道</dt><dd>${escapeHtml(planTitle())}</dd></div>
          <div class="result-row"><dt>额度状态</dt><dd>已扣除 1 个税号额度</dd></div>
        </dl>
      </div>
      ${footer("返回门店详情", "return-store")}
    </section>
  `;
}

function renderScreen() {
  const renderers = {
    scenario: renderScenario,
    store: renderStore,
    activation: renderActivation,
    "onboarding-home": renderOnboardingHome,
    subject: renderSubject,
    "subject-manual": renderSubjectManual,
    "subject-manual-confirm": renderSubjectManualConfirm,
    "rpa-form": renderRpaForm,
    "invoice-info": renderInvoiceInfo,
    "invoice-item": renderInvoiceItem,
    progress: renderProgress,
    "operation-guide": renderOperationGuide,
    success: renderSuccess,
  };
  return (renderers[state.screen] || renderScenario)();
}

function render() {
  const theme = currentTheme();
  document.body.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "activation" ? "#cf403c" : "#ffffff");
  renderHeader();
  $("#app").innerHTML = renderScreen();
}

function parseValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function runButtonTask(button, loadingText, task) {
  if (!button || button.dataset.loading === "true") return;
  button.dataset.loading = "true";
  button.disabled = true;
  button.classList.add("loading");
  button.textContent = loadingText;
  window.setTimeout(task, 360);
}

function openQueryError() {
  const modal = $("#queryErrorModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

function closeQueryError() {
  const modal = $("#queryErrorModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

function openRestartConfirm(type, product = "") {
  state.pendingRestart = { type, product };
  const modal = $("#restartConfirmModal");
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

function closeRestartConfirm() {
  state.pendingRestart = null;
  const modal = $("#restartConfirmModal");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
}

function confirmRestart() {
  const pending = state.pendingRestart;
  if (!pending) return;
  closeRestartConfirm();
  if (pending.type === "wechat") {
    state.wechatStage = 0;
    state.wechatQrGenerated = true;
    state.wechatStatus = "";
    state.wechatFailureStage = null;
    state.wechatFailureReason = "";
    render();
    if (state.plan !== "leqi-wechat") openQrSheet();
    return;
  }
  if (pending.type === "alipay" && pending.product) {
    state.alipayProductStatuses[pending.product] = "AUTH_PENDING";
    render();
    openAlipayProductQr(pending.product);
  }
}

function qrMarkup(seed = 1) {
  const cells = [];
  const finder = (x, y, sx, sy) => {
    const dx = x - sx;
    const dy = y - sy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  };
  for (let y = 0; y < 21; y += 1) {
    for (let x = 0; x < 21; x += 1) {
      const finderValue = finder(x, y, 0, 0) ?? finder(x, y, 14, 0) ?? finder(x, y, 0, 14);
      const dark = finderValue === null ? ((x * 11 + y * 7 + seed * 13 + x * y) % 9) < 4 : finderValue;
      cells.push(`<span class="qr-cell${dark ? " dark" : ""}"></span>`);
    }
  }
  return `<div class="qr-grid" aria-label="授权二维码">${cells.join("")}</div>`;
}

function tencentQrPosterDataUrl() {
  const seed = 3;
  const finder = (x, y, sx, sy) => {
    const dx = x - sx;
    const dy = y - sy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  };
  const cells = [];
  for (let y = 0; y < 21; y += 1) {
    for (let x = 0; x < 21; x += 1) {
      const finderValue = finder(x, y, 0, 0) ?? finder(x, y, 14, 0) ?? finder(x, y, 0, 14);
      const dark = finderValue === null ? ((x * 11 + y * 7 + seed * 13 + x * y) % 9) < 4 : finderValue;
      if (dark) cells.push(`<rect x="${205 + x * 10}" y="${326 + y * 10}" width="10" height="10" fill="#111827"/>`);
    }
  }
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="620" height="690" viewBox="0 0 620 690">
      <rect width="620" height="690" rx="16" fill="#ffffff"/>
      <rect x="1" y="1" width="618" height="688" rx="15" fill="none" stroke="#e5e6eb" stroke-width="2"/>
      <text x="32" y="52" fill="#1d2129" font-size="26" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">腾讯乐企联用开通</text>
      <line x1="32" y1="78" x2="588" y2="78" stroke="#e5e6eb" stroke-width="2"/>
      <text x="32" y="128" fill="#86909c" font-size="22" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">企业名称</text>
      <text x="180" y="128" fill="#1d2129" font-size="22" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeHtml(taxpayerName())}</text>
      <line x1="32" y1="154" x2="588" y2="154" stroke="#e5e6eb" stroke-width="2"/>
      <text x="32" y="204" fill="#86909c" font-size="22" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">税号</text>
      <text x="180" y="204" fill="#1d2129" font-size="22" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeHtml(taxpayerNo())}</text>
      <line x1="32" y1="230" x2="588" y2="230" stroke="#e5e6eb" stroke-width="2"/>
      <text x="32" y="274" fill="#86909c" font-size="22" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">微信商户号</text>
      <text x="180" y="274" fill="#1d2129" font-size="22" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">${escapeHtml(state.wechatMerchantNo)}</text>
      <rect x="189" y="310" width="242" height="242" rx="8" fill="#ffffff" stroke="#e5e6eb" stroke-width="2"/>
      ${cells.join("")}
      <text x="310" y="606" text-anchor="middle" fill="#1d2129" font-size="22" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">请微信商户超级管理员</text>
      <text x="310" y="642" text-anchor="middle" fill="#4e5969" font-size="20" font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">使用个人微信扫码完成开通</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function openSheet({ title, body, action, primaryText = "", link = "", secondaryText = "", hideActions = false }) {
  state.sheetAction = action;
  state.sheetLink = link;
  $("#sheetTitle").textContent = title;
  $("#sheetBody").innerHTML = body;
  $("#sheetActions").innerHTML = hideActions
    ? ""
    : `
        ${secondaryText ? `<button class="button tertiary" data-action="copy-link">${escapeHtml(secondaryText)}</button>` : ""}
        <button class="button primary" data-action="sheet-primary">${escapeHtml(primaryText)}</button>
      `;
  $("#sheet").classList.add("open");
  $("#sheet").setAttribute("aria-hidden", "false");
}

function closeSheet() {
  $("#sheet").classList.remove("open");
  $("#sheet").setAttribute("aria-hidden", "true");
  state.sheetAction = null;
  state.sheetLink = "";
}

function qrMerchantInfo(includeWechatMerchantNo = false) {
  return `
    <div class="qr-merchant-info">
      <div class="qr-merchant-row"><span>企业名称</span><strong>${escapeHtml(taxpayerName())}</strong></div>
      <div class="qr-merchant-row"><span>税号</span><strong>${escapeHtml(taxpayerNo())}</strong></div>
      ${includeWechatMerchantNo ? `<div class="qr-merchant-row"><span>微信商户号</span><strong>${escapeHtml(state.wechatMerchantNo)}</strong></div>` : ""}
    </div>
  `;
}

function openQrSheet() {
  openSheet({
    title: "微信扫码授权",
    body: `
      <div class="qr-wrap">
        ${qrMerchantInfo(true)}
        ${qrMarkup(3)}
        <p>请微信商户超级管理员，使用个人微信扫码授权</p>
      </div>
    `,
    action: "close-only",
    hideActions: true,
  });
}

function openRefreshSimulator(context, product = "") {
  const productAttr = product ? ` data-product="${escapeHtml(product)}"` : "";
  openSheet({
    title: "模拟查询结果",
    body: `
      <p class="sheet-copy">请选择本次查询返回的状态</p>
      <div class="simulation-result-list">
        <button class="simulation-result success" data-action="simulate-refresh" data-context="${escapeHtml(context)}" data-result="success"${productAttr}><strong>成功</strong><span>更新为开通成功</span></button>
        <button class="simulation-result danger" data-action="simulate-refresh" data-context="${escapeHtml(context)}" data-result="failure"${productAttr}><strong>失败</strong><span>更新为开通失败</span></button>
        <button class="simulation-result processing" data-action="simulate-refresh" data-context="${escapeHtml(context)}" data-result="processing"${productAttr}><strong>进行中</strong><span>保持开通中</span></button>
      </div>
    `,
    action: "close-only",
    primaryText: "取消",
  });
}

function openWechatStatusSimulator(result) {
  const statuses = result === "processing" ? wechatProcessingStatusMeta : wechatFailedStatusMeta;
  openSheet({
    title: result === "processing" ? "选择微信开通中状态" : "选择微信开通失败状态",
    body: `
      <p class="sheet-copy">请选择本次微信查询返回的状态</p>
      <div class="simulation-result-list wechat-status-list">
        ${Object.entries(statuses)
          .map(([code, meta]) => {
            const description = typeof meta === "string" ? meta : meta.description;
            return `<button class="simulation-result ${result === "processing" ? "processing" : "danger"}" data-action="simulate-wechat-status" data-status="${escapeHtml(code)}"><strong>${escapeHtml(code)}</strong><span>${escapeHtml(description)}</span></button>`;
          })
          .join("")}
      </div>
    `,
    action: "close-only",
    primaryText: "取消",
  });
}

function applySimulatedRefresh(context, result, product = "") {
  if (context === "wechat-opening") {
    if (result === "success") {
      state.wechatStage = 3;
      state.wechatStatus = "ENABLED";
      state.wechatFailureStage = null;
      state.wechatFailureReason = "";
    } else {
      openWechatStatusSimulator(result);
      return;
    }
  }
  if (context === "alipay-opening" && product) {
    state.alipayProductStatuses[product] = result === "success" ? "ACTIVATION_SUCCESS" : result === "failure" ? "ACTIVATION_FAIL" : "AUTH_PENDING";
  }
  closeSheet();
  render();
  showToast(`刷新结果：${result === "success" ? "成功" : result === "failure" ? "失败" : "进行中"}`);
}

function applyWechatStatus(status) {
  state.wechatStatus = status;
  state.wechatStage = status === "ENABLED" ? 3 : 1;
  state.wechatFailureStage = wechatFailedStatusMeta[status] ? 1 : null;
  state.wechatFailureReason = wechatFailedStatusMeta[status]?.reason || "";
  closeSheet();
  render();
  showToast(wechatFailedStatusMeta[status] ? "已更新为开通失败" : "已更新微信开通进度");
}

function openAlipayProductQr(code) {
  const product = alipayProductMeta[code];
  openSheet({
    title: product.title,
    body: `
      <div class="qr-wrap">
        ${qrMerchantInfo()}
        ${qrMarkup(code === "basic" ? 7 : code === "oil" ? 11 : 13)}
        <p>请商家法人或财务负责人，使用支付宝 App 扫码完成开通</p>
      </div>
    `,
    action: "close-only",
    hideActions: true,
  });
}

function handleSheetPrimary() {
  closeSheet();
  render();
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (!trigger || trigger.disabled) return;
  const action = trigger.dataset.action;

  if (action === "back") back();
  if (action === "reset") {
    Object.assign(state, initialState());
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (action === "select-option") {
    state[trigger.dataset.field] = parseValue(trigger.dataset.value);
    render();
  }
  if (action === "toggle-ability") {
    const field = trigger.dataset.field;
    state[field] = !state[field];
    render();
  }
  if (action === "start-scenario") {
    resetDownstream();
    prepareActivationPreset();
    state.stack = ["scenario"];
    state.screen = "store";
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (action === "open-invoice") go("activation");
  if (action === "start-activation") {
    state.activationStatus = "processing";
    go("onboarding-home");
  }
  if (action === "open-current-step") {
    const next = onboardingNextStep();
    if (next === 1) go(state.merchantType === "micro" ? "subject-manual" : "subject");
    if (next === 2) {
      if (state.plan === "rpa") go("rpa-form");
      else {
        state.openingSubmitted = true;
        goProgress();
      }
    }
    if (next === 3) go("invoice-info");
  }
  if (action === "mock-upload-license") {
    state.manualTaxNo = "92370104MA3QG053X9";
    render();
    showToast("营业执照已识别");
  }
  if (action === "use-merchant-license") {
    state.subjectSame = true;
    finishSubjectConfirmation();
  }
  if (action === "use-other-license") {
    state.subjectSame = false;
    state.manualLegalName = "";
    state.manualTaxNo = "";
    go("subject-manual");
  }
  if (action === "query-taxpayer") {
    const result = queryTaxpayerByTaxNo(state.manualTaxNo);
    if (!result) {
      openQueryError();
      return;
    }
    state.manualLegalName = result.legalName;
    state.manualTaxNo = result.taxNo;
    go("subject-manual-confirm");
  }
  if (action === "confirm-manual-taxpayer") {
    state.subjectSame = false;
    finishRpaSubjectConfirmation();
  }
  if (action === "retry-manual-taxpayer") go("subject-manual");
  if (action === "close-query-error") closeQueryError();
  if (action === "resume-progress") goProgress();
  if (action === "open-operation-guide") {
    state.operationGuideType = trigger.dataset.guide || "wechat";
    go("operation-guide");
  }
  if (action === "submit-rpa") {
    state.issuerConfirmed = true;
    go("invoice-info");
  }
  if (action === "invoice-seller-next") go("invoice-item");
  if (action === "toggle-invoice-item-expand") {
    state.invoiceItemExpanded = !state.invoiceItemExpanded;
    render();
  }
  if (action === "submit-invoice-info") {
    state.invoiceInfoConfirmed = true;
    if (state.plan === "rpa") {
      state.openingSubmitted = true;
      state.rpaStage = 1;
      goProgress();
    } else {
      state.activationStatus = "active";
      state.stack = ["store"];
      state.screen = "success";
      render();
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }
  if (action === "get-code") showToast("验证码已发送");
  if (action === "open-wechat-auth") {
    const mid = state.wechatMerchantNo.trim();
    if (!mid) {
      showToast("未查询到当前使用的微信商户号");
      return;
    }
    if (!state.wechatQrGenerated) {
      runButtonTask(trigger, "生成中", () => {
        state.wechatQrGenerated = true;
        state.wechatStatus = "";
        state.wechatFailureStage = null;
        state.wechatFailureReason = "";
        render();
        if (state.plan !== "leqi-wechat") openQrSheet();
      });
      return;
    }
    if (state.plan !== "leqi-wechat") openQrSheet();
  }
  if (action === "regenerate-wechat-auth") {
    openRestartConfirm("wechat");
  }
  if (action === "open-refresh-simulator") openRefreshSimulator(trigger.dataset.context, trigger.dataset.product || "");
  if (action === "simulate-refresh") applySimulatedRefresh(trigger.dataset.context, trigger.dataset.result, trigger.dataset.product || "");
  if (action === "simulate-wechat-status") applyWechatStatus(trigger.dataset.status);
  if (action === "open-alipay-product-qr") {
    const product = trigger.dataset.product;
    if (state.alipayProductStatuses[product] === "NOT_STARTED") {
      runButtonTask(trigger, "生成中", () => {
        state.alipayProductStatuses[product] = "AUTH_PENDING";
        render();
        openAlipayProductQr(product);
      });
      return;
    }
    openAlipayProductQr(product);
  }
  if (action === "restart-alipay-product") {
    openRestartConfirm("alipay", trigger.dataset.product);
  }
  if (action === "refresh-rpa") {
    state.rpaStage = Math.min(state.rpaStage + 1, 4);
    render();
    showToast(state.rpaStage >= 4 ? "企享云通道已开通" : "开通进度已更新");
  }
  if (action === "finish-opening") {
    if (state.plan !== "rpa" && !state.invoiceInfoConfirmed) {
      go("invoice-info");
      return;
    } else {
      state.activationStatus = "active";
      state.stack = ["store"];
      state.screen = "success";
    }
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (action === "show-success") go("success");
  if (action === "return-store") {
    state.stack = ["scenario"];
    state.screen = "store";
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (action === "close-sheet") closeSheet();
  if (action === "close-restart-confirm") closeRestartConfirm();
  if (action === "confirm-restart") confirmRestart();
  if (action === "sheet-primary") handleSheetPrimary();
  if (action === "copy-link") {
    if (state.sheetLink) copyText(state.sheetLink);
    showToast("链接已复制");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "manualTaxNo") state.manualTaxNo = event.target.value;
  if (event.target.id === "manualTaxNo") {
    const query = document.querySelector('[data-action="query-taxpayer"]');
    if (query) query.disabled = !state.manualTaxNo.trim();
  }
});

render();
