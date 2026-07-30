const app = document.getElementById("app");
const modalRoot = document.getElementById("modalRoot");
const toast = document.getElementById("toast");
const BRAND_LOGO_SET_LIMIT = 7;

const chinaTaxClassificationCatalog = [
  { code: "1040201000000000000", shortName: "服装" },
  { code: "1040207000000000000", shortName: "箱包" },
  { code: "1060502990000000000", shortName: "其他家具" },
  { code: "3049900000000000000", shortName: "其他现代服务" },
];

const chinaTaxRateOptions = ["0%", "1%", "3%", "4%", "5%", "6%", "9%", "10%", "11%", "13%", "16%", "17%"];

const chinaPreferentialPolicyOptions = [
  "无",
  "03 免税",
  "04 不征税",
  "08 按3%简易征收",
  "09 按5%简易征收",
  "10 按5%简易征收减按1.5%计征",
];

const malaysiaClassificationCatalog = [
  { code: "001", name: "Breastfeeding equipment", description: "母乳喂养设备" },
  { code: "002", name: "Child care centres and kindergartens fees", description: "托儿中心和幼儿园费用" },
  { code: "003", name: "Computer, smartphone or tablet", description: "电脑、智能手机或平板电脑" },
  { code: "004", name: "Consolidated e-Invoice", description: "Consolidated e-Invoice" },
  { code: "005", name: "Construction materials", description: "建筑材料" },
  { code: "006", name: "Disbursement", description: "代垫款" },
  { code: "007", name: "Donation", description: "捐赠" },
  { code: "008", name: "e-Commerce - e-Invoice to buyer / purchaser", description: "电子商务 - 向买方开具 e-Invoice" },
  { code: "009", name: "e-Commerce - Self-billed e-Invoice to seller, logistics, etc.", description: "电子商务 - 自开票" },
  { code: "010", name: "Education fees", description: "教育费用" },
  { code: "011", name: "Goods on consignment (Consignor)", description: "寄售商品 - 委托方" },
  { code: "012", name: "Goods on consignment (Consignee)", description: "寄售商品 - 受托方" },
  { code: "013", name: "Gym membership", description: "健身房会员费" },
  { code: "014", name: "Insurance - Education and medical benefits", description: "保险 - 教育及医疗福利" },
  { code: "015", name: "Insurance - Takaful or life insurance", description: "伊斯兰保险或人寿保险" },
  { code: "016", name: "Interest and financing expenses", description: "利息和融资费用" },
  { code: "017", name: "Internet subscription", description: "互联网订阅" },
  { code: "018", name: "Land and building", description: "土地和建筑物" },
  { code: "019", name: "Medical examination for learning disabilities and related treatment", description: "学习障碍检查及相关治疗" },
  { code: "020", name: "Medical examination or vaccination expenses", description: "医疗检查或疫苗接种费用" },
  { code: "021", name: "Medical expenses for serious diseases", description: "严重疾病医疗费用" },
  { code: "022", name: "Others", description: "其他" },
  { code: "023", name: "Petroleum operations", description: "石油业务" },
  { code: "024", name: "Private retirement scheme or deferred annuity scheme", description: "私人退休计划或递延年金计划" },
  { code: "025", name: "Motor vehicle", description: "机动车" },
  { code: "026", name: "Subscription of books, journals, magazines, newspapers or similar publications", description: "书籍、期刊、杂志、报纸等订阅" },
  { code: "027", name: "Reimbursement", description: "报销" },
  { code: "028", name: "Rental of motor vehicle", description: "机动车租赁" },
  { code: "029", name: "EV charging facilities", description: "电动汽车充电设施" },
  { code: "030", name: "Repair and maintenance", description: "维修和保养" },
  { code: "031", name: "Research and development", description: "研究与开发" },
  { code: "032", name: "Foreign income", description: "境外收入" },
  { code: "033", name: "Self-billed - Betting and gaming", description: "自开票 - 博彩和游戏" },
  { code: "034", name: "Self-billed - Importation of goods", description: "自开票 - 进口货物" },
  { code: "035", name: "Self-billed - Importation of services", description: "自开票 - 进口服务" },
  { code: "036", name: "Self-billed - Others", description: "自开票 - 其他" },
  { code: "037", name: "Self-billed - Monetary payment to agents, dealers or distributors", description: "自开票 - 向代理商等支付货币报酬" },
  { code: "038", name: "Sports equipment and sports-related fees", description: "体育器材及体育相关费用" },
  { code: "039", name: "Supporting equipment for disabled person", description: "残障人士辅助设备" },
  { code: "040", name: "Voluntary contribution to approved provident fund", description: "向获批准公积金自愿缴款" },
  { code: "041", name: "Dental examination or treatment", description: "牙科检查或治疗" },
  { code: "042", name: "Fertility treatment", description: "生育治疗" },
  { code: "043", name: "Treatment, home care nursing, daycare centres and residential care centres", description: "治疗及照护服务" },
  { code: "044", name: "Vouchers, gift cards, loyalty points, etc.", description: "优惠券、礼品卡、会员积分等" },
  { code: "045", name: "Self-billed - Non-monetary payment to agents, dealers or distributors", description: "自开票 - 向代理商等支付非货币报酬" },
];

const malaysiaTaxTypeCatalog = [
  { code: "01", name: "Sales Tax", description: "销售税", rates: ["5%", "10%"] },
  { code: "02", name: "Service Tax", description: "服务税", rates: ["6%", "8%"] },
  { code: "06", name: "Not Applicable", description: "不适用税", rates: ["0%"] },
];

const initialCustomers = [
  {
    id: "160247797573",
    name: "可可臻选零售集团",
    shortName: "可可臻选",
    customerType: "KA",
    industryLevelOneCode: "002",
    industryLevelOneName: "生活百货",
    industryLevelTwoCode: "002023",
    industryLevelTwoName: "包装食品",
    projectNo: "KA-COCOA-A000001",
    standardLogo: "",
    horizontalLogo: "",
    contactName: "林雅雯",
    contactPhone: "+60 12-668 9018",
    contactEmail: "contact@cocoa-atelier.example",
    salesName: "芳雨晴",
    salesOrg: "大客户/总部/Stanley的组织",
    customerExecutive: "柳智妍",
    remark: "巧克力品牌连锁示例客户",
    createdAt: "2026-07-18 10:20:18",
    productOpen: true,
    companies: [
      {
        id: "CO-MY-1001",
        country: "MY",
        type: "Head",
        parentCompanyId: "",
        legalName: "Cocoa Atelier Retail Sdn. Bhd.",
        address: "Level 18, Menara Sentral Vista, Kuala Lumpur",
        email: "finance@cocoa-atelier.example",
        phone: "+60 3-2788 6618",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002023",
        industryLevelTwoName: "包装食品",
        businessDesc: "巧克力、糖果及礼盒的零售与品牌门店经营",
        remark: "马来西亚零售业务总公司",
        createdAt: "2026-07-18 15:40",
        licenses: {
          BRN: "202401018821",
          TIN: "C25881234010",
          SST: "W10-2405-32000123",
        },
        invoiceStatus: "opened",
        taxpayerExists: true,
        openAttempted: true,
        openedAt: "2026-07-20 15:18",
      },
      {
        id: "CO-MY-1002",
        country: "MY",
        type: "Branch",
        parentCompanyId: "CO-MY-1001",
        legalName: "Cocoa Atelier Penang Sdn. Bhd.",
        address: "88, Lebuh Pantai, George Town, Pulau Pinang",
        email: "",
        phone: "+60 4-228 7741",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002023",
        industryLevelTwoName: "包装食品",
        businessDesc: "槟城区域巧克力及伴手礼门店经营",
        remark: "槟城区域分公司",
        createdAt: "2026-07-19 09:25",
        licenses: {
          BRN: "202501006612",
          TIN: "",
          SST: "",
        },
        invoiceStatus: "unopened",
        taxpayerExists: false,
        openAttempted: false,
        openedAt: "",
      },
    ],
    brands: [
      {
        id: "BR-MY-001",
        country: "MY",
        name: "Cocoa Atelier",
        shortName: "CA",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002023",
        industryLevelTwoName: "包装食品",
        description: "面向城市商圈的精品巧克力与礼盒连锁品牌",
        createdAt: "2026-07-19 11:05",
        standardLogo: "cocoa-atelier-standard.png",
        horizontalLogo: "cocoa-atelier-horizontal.png",
        logoText: "CA",
        logoHorizontalText: "COCOA ATELIER",
        stores: [
          {
            id: "ST-MY-001",
            name: "吉隆坡柏威年店",
            storeNo: "KL-PAV-01",
            createdAt: "2026-07-19 13:20",
            enabled: true,
            countryCode: "MY",
            regionLevel1Code: "14",
            regionLevel1Name: "Federal Territory of Kuala Lumpur",
            regionLevel2Code: "",
            regionLevel2Name: "",
            regionLevel3Code: "MY-14-KUL",
            regionLevel3Name: "Kuala Lumpur",
            regionPath: "Federal Territory of Kuala Lumpur / Kuala Lumpur",
            city: "Kuala Lumpur",
            address: "Pavilion Kuala Lumpur, Bukit Bintang",
            phone: "+60 3-2118 8833",
            remark: "",
            companyId: "CO-MY-1001",
            associationStatus: "associated",
            invoiceEnabled: true,
          },
          {
            id: "ST-MY-002",
            name: "槟城乔治市店",
            storeNo: "PG-GT-01",
            createdAt: "2026-07-19 13:35",
            enabled: true,
            countryCode: "MY",
            regionLevel1Code: "07",
            regionLevel1Name: "Pulau Pinang",
            regionLevel2Code: "MY-07-TL",
            regionLevel2Name: "Timur Laut District",
            regionLevel3Code: "MY-07-GT",
            regionLevel3Name: "George Town",
            regionPath: "Pulau Pinang / Timur Laut District / George Town",
            city: "George Town",
            address: "88, Lebuh Pantai, George Town",
            phone: "+60 4-228 7741",
            remark: "槟城旗舰门店",
            companyId: "",
            associationStatus: "unassociated",
            invoiceEnabled: false,
          },
          {
            id: "ST-MY-003",
            name: "吉隆坡双子塔快闪店",
            storeNo: "KL-KLCC-POP",
            createdAt: "2026-07-19 14:10",
            enabled: true,
            countryCode: "MY",
            regionLevel1Code: "14",
            regionLevel1Name: "Federal Territory of Kuala Lumpur",
            regionLevel2Code: "",
            regionLevel2Name: "",
            regionLevel3Code: "MY-14-KUL",
            regionLevel3Name: "Kuala Lumpur",
            regionPath: "Federal Territory of Kuala Lumpur / Kuala Lumpur",
            city: "Kuala Lumpur",
            address: "Suria KLCC, Kuala Lumpur",
            phone: "",
            remark: "期间限定门店",
            companyId: "CO-MY-1002",
            associationStatus: "associated",
            invoiceEnabled: false,
          },
        ],
        config: {
          rules: [
            {
              id: "RULE-001",
              category: "Chocolate Gift Box",
              alias: "巧克力礼盒",
              classification: "022",
              taxRate: "10%",
            },
            {
              id: "RULE-002",
              category: "Chocolate Bar",
              alias: "巧克力制品",
              classification: "022",
              taxRate: "10%",
            },
          ],
          fallbacks: [
            {
              id: "FB-001",
              companyId: "CO-MY-1001",
              itemName: "Chocolate Products",
              classification: "022",
              taxRate: "10%",
            },
          ],
          application: {
            qrDays: "30",
            theme: "cocoa",
            note: "请核对订单信息并填写买方资料。提交后可在申请结果页查看电子发票。",
          },
        },
      },
      {
        id: "BR-CN-001",
        country: "CN",
        name: "寰宇生活",
        shortName: "寰宇生活",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002026",
        industryLevelTwoName: "家电/家居/家纺用品",
        description: "面向中国市场的家居生活与礼品零售品牌",
        createdAt: "2026-07-21 10:40",
        standardLogo: "huanyu-standard.png",
        horizontalLogo: "huanyu-horizontal.png",
        logoText: "寰宇",
        logoHorizontalText: "寰宇生活",
        stores: [
          {
            id: "ST-CN-001",
            name: "上海静安嘉里中心店",
            storeNo: "SH-JAKC-01",
            createdAt: "2026-07-21 13:20",
            enabled: true,
            countryCode: "CN",
            regionLevel1Code: "CN-31",
            regionLevel1Name: "上海市",
            regionLevel2Code: "CN-31-01",
            regionLevel2Name: "上海市",
            regionLevel3Code: "CN-31-JA",
            regionLevel3Name: "静安区",
            regionPath: "上海市 / 上海市 / 静安区",
            city: "上海市",
            address: "上海市静安区南京西路 1515 号",
            phone: "021-6288 6608",
            remark: "",
            companyId: "",
            associationStatus: "unassociated",
            invoiceEnabled: true,
            updatedAt: "2026-07-23 10:18",
          },
        ],
        config: {
          itemNameSource: "order-item",
          rules: [
            {
              id: "RULE-CN-001",
              category: "家居用品",
              alias: "家居用品",
              classification: "1060502990000000000",
              taxShortName: "其他家具",
              taxRate: "13%",
              preferentialPolicy: "无",
              specifiedCompanyId: "",
              updatedAt: "2026-07-23 10:20",
            },
          ],
          fallbacks: [],
          payments: [
            {
              id: "PAY-CN-001",
              code: "GIFT_CARD",
              name: "礼品卡",
              updatedAt: "2026-07-23 10:25",
            },
          ],
          application: {
            qrDays: "30",
            selfReissueEnabled: true,
            selfReissueMaxCount: "2",
            selfReissueValidDays: "180",
            pageStyle: "经典",
            theme: "black-gold",
            note: "请确认订单信息后提交开票申请。如订单已发生退换货，请以当前可开票金额为准。",
          },
        },
      },
    ],
  },
  {
    id: "160247795679",
    name: "寰宇生活零售集团",
    shortName: "寰宇生活",
    customerType: "KA",
    industryLevelOneCode: "002",
    industryLevelOneName: "生活百货",
    industryLevelTwoCode: "002026",
    industryLevelTwoName: "家电/家居/家纺用品",
    projectNo: "KA-HYSH-A000002",
    standardLogo: "",
    horizontalLogo: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    salesName: "Stanley",
    salesOrg: "大客户/总部/Stanley的组织",
    customerExecutive: "殷超",
    remark: "用于展示统一平台的中国公司主档",
    createdAt: "2026-07-21 09:30:26",
    productOpen: false,
    companies: [
      {
        id: "CO-CN-2001",
        country: "CN",
        type: "Head",
        parentCompanyId: "",
        legalName: "上海寰宇生活零售有限公司",
        address: "上海市静安区南京西路 688 号",
        email: "finance@huanyu-retail.example",
        phone: "021-6123 6608",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002026",
        industryLevelTwoName: "家电/家居/家纺用品",
        businessDesc: "家居生活用品及礼品零售",
        remark: "中国零售业务总公司",
        createdAt: "2026-07-21 11:10",
        licenses: {
          USCC: "91310106MA1DEMO001",
        },
        invoiceStatus: "unopened",
        taxpayerExists: false,
        openAttempted: false,
        openedAt: "",
      },
      {
        id: "CO-CN-2002",
        country: "CN",
        type: "Branch",
        parentCompanyId: "CO-CN-2001",
        legalName: "上海寰宇生活浦东分公司",
        address: "",
        email: "",
        phone: "",
        industryLevelOneCode: "002",
        industryLevelOneName: "生活百货",
        industryLevelTwoCode: "002026",
        industryLevelTwoName: "家电/家居/家纺用品",
        businessDesc: "",
        remark: "浦东区域分公司",
        createdAt: "2026-07-22 09:45",
        licenses: {
          USCC: "91310115MA1DEMO002",
        },
        invoiceStatus: "unopened",
        taxpayerExists: false,
        openAttempted: false,
        openedAt: "",
      },
    ],
    brands: [],
  },
];

const demoIndustries = {
  food: {
    levelOneCode: "002",
    levelOneName: "生活百货",
    levelTwoCode: "002023",
    levelTwoName: "包装食品",
  },
  home: {
    levelOneCode: "002",
    levelOneName: "生活百货",
    levelTwoCode: "002026",
    levelTwoName: "家电/家居/家纺用品",
  },
  dining: {
    levelOneCode: "001",
    levelOneName: "餐饮",
    levelTwoCode: "001002",
    levelTwoName: "中式餐饮",
  },
  fashion: {
    levelOneCode: "002",
    levelOneName: "生活百货",
    levelTwoCode: "002006",
    levelTwoName: "服饰箱包",
  },
};

const demoRegions = {
  shanghai: {
    level1Code: "CN-31",
    level1Name: "上海市",
    level2Code: "CN-31-01",
    level2Name: "上海市",
    level3Code: "CN-31-JA",
    level3Name: "静安区",
    path: "上海市 / 上海市 / 静安区",
    city: "上海市",
  },
  beijing: {
    level1Code: "CN-11",
    level1Name: "北京市",
    level2Code: "CN-11-01",
    level2Name: "北京市",
    level3Code: "CN-11-CY",
    level3Name: "朝阳区",
    path: "北京市 / 北京市 / 朝阳区",
    city: "北京市",
  },
  shenzhen: {
    level1Code: "CN-44",
    level1Name: "广东省",
    level2Code: "CN-44-SZ",
    level2Name: "深圳市",
    level3Code: "CN-44-SZ-NS",
    level3Name: "南山区",
    path: "广东省 / 深圳市 / 南山区",
    city: "深圳市",
  },
  hangzhou: {
    level1Code: "CN-33",
    level1Name: "浙江省",
    level2Code: "CN-33-HZ",
    level2Name: "杭州市",
    level3Code: "CN-33-HZ-SC",
    level3Name: "上城区",
    path: "浙江省 / 杭州市 / 上城区",
    city: "杭州市",
  },
  hongKong: {
    level1Code: "CN-HK",
    level1Name: "香港特别行政区",
    level2Code: "CN-HK-HKI",
    level2Name: "香港岛",
    level3Code: "CN-HK-CW",
    level3Name: "中西区",
    path: "香港特别行政区 / 香港岛 / 中西区",
    city: "香港",
  },
  kualaLumpur: {
    level1Code: "14",
    level1Name: "Federal Territory of Kuala Lumpur",
    level2Code: "",
    level2Name: "",
    level3Code: "MY-14-KUL",
    level3Name: "Kuala Lumpur",
    path: "Federal Territory of Kuala Lumpur / Kuala Lumpur",
    city: "Kuala Lumpur",
  },
  penang: {
    level1Code: "07",
    level1Name: "Pulau Pinang",
    level2Code: "MY-07-TL",
    level2Name: "Timur Laut District",
    level3Code: "MY-07-GT",
    level3Name: "George Town",
    path: "Pulau Pinang / Timur Laut District / George Town",
    city: "George Town",
  },
  johorBahru: {
    level1Code: "01",
    level1Name: "Johor",
    level2Code: "MY-01-JB",
    level2Name: "Johor Bahru District",
    level3Code: "MY-01-JBC",
    level3Name: "Johor Bahru",
    path: "Johor / Johor Bahru District / Johor Bahru",
    city: "Johor Bahru",
  },
  petalingJaya: {
    level1Code: "10",
    level1Name: "Selangor",
    level2Code: "MY-10-PET",
    level2Name: "Petaling District",
    level3Code: "MY-10-PJ",
    level3Name: "Petaling Jaya",
    path: "Selangor / Petaling District / Petaling Jaya",
    city: "Petaling Jaya",
  },
};

function demoCompany({
  id,
  country,
  type = "Head",
  parentCompanyId = "",
  legalName,
  registrationNo,
  tin = "",
  sst = "",
  address,
  phone = "",
  email = "",
  industry = demoIndustries.home,
  businessDesc,
  remark,
  createdAt,
  invoiceStatus = "opened",
}) {
  const opened = invoiceStatus === "opened";
  return {
    id,
    country,
    type,
    parentCompanyId,
    legalName,
    address,
    email,
    phone,
    industryLevelOneCode: industry.levelOneCode,
    industryLevelOneName: industry.levelOneName,
    industryLevelTwoCode: industry.levelTwoCode,
    industryLevelTwoName: industry.levelTwoName,
    businessDesc,
    remark,
    createdAt,
    licenses: country === "MY" ? { BRN: registrationNo, TIN: tin, SST: sst } : { USCC: registrationNo },
    invoiceStatus,
    taxpayerExists: opened,
    openAttempted: opened,
    openedAt: opened ? createdAt : "",
  };
}

function demoStore({
  id,
  name,
  storeNo,
  country,
  region,
  address,
  companyId = "",
  createdAt,
  phone = "",
  remark = "",
  invoiceEnabled = false,
}) {
  return {
    id,
    name,
    storeNo,
    createdAt,
    enabled: true,
    countryCode: country,
    regionLevel1Code: region.level1Code,
    regionLevel1Name: region.level1Name,
    regionLevel2Code: region.level2Code,
    regionLevel2Name: region.level2Name,
    regionLevel3Code: region.level3Code,
    regionLevel3Name: region.level3Name,
    regionPath: region.path,
    city: region.city,
    address,
    phone,
    remark,
    companyId,
    associationStatus: companyId ? "associated" : "unassociated",
    invoiceEnabled,
    updatedAt: createdAt,
  };
}

function demoChinaInvoiceConfig({ category, alias, companyId = "", classification = "1040201000000000000", taxShortName = "服装", taxRate = "13%" }) {
  return {
    itemNameSource: "order-item",
    rules: [
      {
        id: `RULE-${category}`,
        category,
        alias,
        classification,
        taxShortName,
        taxType: "VAT",
        taxTypeName: "增值税",
        taxRate,
        preferentialPolicy: "无",
        specifiedCompanyId: companyId,
        updatedAt: "2026-07-28 10:00",
      },
    ],
    fallbacks: companyId
      ? [
          {
            id: `FB-${category}`,
            companyId,
            itemName: alias,
            classification,
            taxShortName,
            taxType: "VAT",
            taxTypeName: "增值税",
            taxRate,
            preferentialPolicy: "无",
            updatedAt: "2026-07-28 10:00",
          },
        ]
      : [],
    payments: [],
    application: {
      qrDays: "30",
      selfReissueEnabled: true,
      selfReissueMaxCount: "2",
      selfReissueValidDays: "180",
      pageStyle: "经典",
      theme: "black-gold",
      note: "请确认订单信息后提交开票申请。",
    },
  };
}

function demoMalaysiaInvoiceConfig({ category, alias, companyId = "", classification = "022", taxType = "01", taxRate = "10%" }) {
  const classificationItem = malaysiaClassificationCatalog.find((item) => item.code === classification);
  const taxTypeItem = malaysiaTaxTypeCatalog.find((item) => item.code === taxType);
  return {
    itemNameSource: "order-item",
    rules: [
      {
        id: `RULE-MY-${category}`,
        category,
        alias,
        classification,
        classificationName: classificationItem?.name || "",
        taxShortName: classificationItem?.name || "",
        taxType,
        taxTypeName: taxTypeItem?.name || "",
        taxRate,
        preferentialPolicy: "无",
        specifiedCompanyId: companyId,
        updatedAt: "2026-07-28 10:00",
      },
    ],
    fallbacks: companyId
      ? [
          {
            id: `FB-MY-${category}`,
            companyId,
            itemName: alias,
            classification,
            classificationName: classificationItem?.name || "",
            taxShortName: classificationItem?.name || "",
            taxType,
            taxTypeName: taxTypeItem?.name || "",
            taxRate,
            preferentialPolicy: "无",
            updatedAt: "2026-07-28 10:00",
          },
        ]
      : [],
    payments: [],
    application: {},
  };
}

function demoBrand({
  id,
  country,
  name,
  shortName,
  industry = demoIndustries.home,
  description,
  createdAt,
  stores,
  invoiceCompanyId = "",
  taxCategory = "零售商品",
  taxAlias = "零售商品",
  taxClassification = "1040201000000000000",
  taxShortName = "服装",
  taxRate = "13%",
}) {
  return {
    id,
    country,
    name,
    shortName,
    industryLevelOneCode: industry.levelOneCode,
    industryLevelOneName: industry.levelOneName,
    industryLevelTwoCode: industry.levelTwoCode,
    industryLevelTwoName: industry.levelTwoName,
    description,
    createdAt,
    standardLogo: `${id.toLowerCase()}-standard.png`,
    horizontalLogo: `${id.toLowerCase()}-horizontal.png`,
    logoText: shortName.slice(0, 2),
    logoHorizontalText: shortName,
    stores,
    config:
      country === "CN"
        ? demoChinaInvoiceConfig({
            category: taxCategory,
            alias: taxAlias,
            companyId: invoiceCompanyId,
            classification: taxClassification,
            taxShortName,
            taxRate,
          })
        : demoMalaysiaInvoiceConfig({
            category: taxCategory,
            alias: taxAlias,
            companyId: invoiceCompanyId || stores.find((store) => store.companyId)?.companyId || "",
            taxRate: taxRate === "13%" ? "10%" : taxRate,
          }),
  };
}

function demoCustomer({
  id,
  name,
  shortName,
  customerType = "KA",
  industry = demoIndustries.home,
  projectNo,
  contactName,
  contactPhone,
  contactEmail,
  salesName,
  customerExecutive,
  remark,
  createdAt,
  productOpen,
  companies,
  brands,
}) {
  return {
    id,
    name,
    shortName,
    customerType,
    industryLevelOneCode: industry.levelOneCode,
    industryLevelOneName: industry.levelOneName,
    industryLevelTwoCode: industry.levelTwoCode,
    industryLevelTwoName: industry.levelTwoName,
    projectNo,
    standardLogo: "",
    horizontalLogo: "",
    contactName,
    contactPhone,
    contactEmail,
    salesName,
    salesOrg: "大客户/总部/国际业务组织",
    customerExecutive,
    remark,
    createdAt,
    productOpen,
    companies,
    brands,
  };
}

function enrichInitialDemoCustomers() {
  const cocoaCustomer = initialCustomers[0];
  cocoaCustomer.name = "可可臻选跨国零售演示客户";
  cocoaCustomer.shortName = "可可臻选跨国";
  cocoaCustomer.remark = "用于演示中国、香港名称品牌与马来西亚业务的跨国零售客户";
  cocoaCustomer.companies.push(
    demoCompany({
      id: "CO-CN-1001",
      country: "CN",
      legalName: "上海可可臻选商业有限公司",
      registrationNo: "91310106MA1COCOA01",
      address: "上海市静安区南京西路 1515 号",
      phone: "021-6288 6608",
      email: "finance.cn@cocoa-atelier.example",
      industry: demoIndustries.food,
      businessDesc: "巧克力、糖果与礼盒的中国市场零售经营",
      remark: "中国业务总公司",
      createdAt: "2026-07-18 16:00",
      invoiceStatus: "opened",
    }),
    demoCompany({
      id: "CO-CN-1002",
      country: "CN",
      type: "Branch",
      parentCompanyId: "CO-CN-1001",
      legalName: "上海可可臻选北京分公司",
      registrationNo: "91110105MA1COCOA02",
      address: "北京市朝阳区建国门外大街 1 号",
      phone: "010-6505 1888",
      industry: demoIndustries.food,
      businessDesc: "北京区域巧克力及礼品零售",
      remark: "北京区域分公司",
      createdAt: "2026-07-19 10:10",
      invoiceStatus: "unopened",
    }),
  );
  cocoaCustomer.brands[0].name = "Cocoa Atelier（马来西亚品牌）";
  cocoaCustomer.brands[0].stores.push(
    demoStore({
      id: "ST-MY-004",
      name: "雪兰莪双威金字塔店",
      storeNo: "SGR-SP-01",
      country: "MY",
      region: demoRegions.petalingJaya,
      address: "Sunway Pyramid, Petaling Jaya",
      companyId: "CO-MY-1001",
      createdAt: "2026-07-20 10:20",
      invoiceEnabled: true,
    }),
    demoStore({
      id: "ST-MY-005",
      name: "新山城中坊店",
      storeNo: "JB-CS-01",
      country: "MY",
      region: demoRegions.johorBahru,
      address: "Johor Bahru City Square, Johor Bahru",
      createdAt: "2026-07-20 11:40",
      remark: "待关联门店",
    }),
  );
  cocoaCustomer.brands[1].name = "可可臻选（中国品牌）";
  cocoaCustomer.brands[1].shortName = "可可臻选";
  cocoaCustomer.brands[1].logoText = "可可";
  cocoaCustomer.brands[1].logoHorizontalText = "可可臻选";
  cocoaCustomer.brands[1].stores[0].companyId = "CO-CN-1001";
  cocoaCustomer.brands[1].stores[0].associationStatus = "associated";
  cocoaCustomer.brands[1].stores.push(
    demoStore({
      id: "ST-CN-002",
      name: "北京国贸商城店",
      storeNo: "BJ-SKP-01",
      country: "CN",
      region: demoRegions.beijing,
      address: "北京市朝阳区建国路 87 号",
      companyId: "CO-CN-1002",
      createdAt: "2026-07-22 09:30",
      invoiceEnabled: false,
    }),
    demoStore({
      id: "ST-CN-003",
      name: "上海前滩太古里店",
      storeNo: "SH-QT-01",
      country: "CN",
      region: demoRegions.shanghai,
      address: "上海市浦东新区东育路 500 弄",
      createdAt: "2026-07-22 10:00",
      remark: "待关联门店",
    }),
  );
  cocoaCustomer.brands[1].config.fallbacks = demoChinaInvoiceConfig({
    category: "巧克力制品",
    alias: "巧克力制品",
    companyId: "CO-CN-1001",
  }).fallbacks;
  cocoaCustomer.brands.push(
    demoBrand({
      id: "BR-CN-002",
      country: "CN",
      name: "港湾可可（香港品牌）",
      shortName: "港湾可可",
      industry: demoIndustries.food,
      description: "面向香港商圈的巧克力伴手礼品牌",
      createdAt: "2026-07-22 15:20",
      invoiceCompanyId: "CO-CN-1001",
      taxCategory: "巧克力礼盒",
      taxAlias: "巧克力礼盒",
      stores: [
        demoStore({
          id: "ST-HK-001",
          name: "香港中环置地广场店",
          storeNo: "HK-CEN-01",
          country: "CN",
          region: demoRegions.hongKong,
          address: "15 Queen's Road Central, Central, Hong Kong",
          companyId: "CO-CN-1001",
          createdAt: "2026-07-22 16:00",
          invoiceEnabled: true,
        }),
      ],
    }),
  );

  const homeCustomer = initialCustomers[1];
  homeCustomer.name = "寰宇生活中国业务演示客户";
  homeCustomer.shortName = "寰宇中国业务";
  homeCustomer.productOpen = true;
  homeCustomer.remark = "用于演示中国总分公司、多品牌和门店关系";
  homeCustomer.companies[0].invoiceStatus = "opened";
  homeCustomer.companies[0].taxpayerExists = true;
  homeCustomer.companies[0].openAttempted = true;
  homeCustomer.companies[0].openedAt = "2026-07-22 11:30";
  homeCustomer.companies.push(
    demoCompany({
      id: "CO-CN-2003",
      country: "CN",
      type: "Branch",
      parentCompanyId: "CO-CN-2001",
      legalName: "上海寰宇生活杭州分公司",
      registrationNo: "91330102MA1DEMO003",
      address: "杭州市上城区延安路 258 号",
      phone: "0571-8708 2218",
      industry: demoIndustries.home,
      businessDesc: "杭州区域家居生活用品零售",
      remark: "杭州区域分公司",
      createdAt: "2026-07-22 10:20",
      invoiceStatus: "unopened",
    }),
  );
  homeCustomer.brands = [
    demoBrand({
      id: "BR-CN-201",
      country: "CN",
      name: "寰宇生活（中国品牌）",
      shortName: "寰宇生活",
      description: "家居生活与节庆礼品零售品牌",
      createdAt: "2026-07-22 13:00",
      invoiceCompanyId: "CO-CN-2001",
      taxCategory: "家居用品",
      taxAlias: "家居用品",
      taxClassification: "1060502990000000000",
      taxShortName: "其他家具",
      stores: [
        demoStore({ id: "ST-CN-201", name: "上海静安大悦城店", storeNo: "HY-SH-01", country: "CN", region: demoRegions.shanghai, address: "上海市静安区西藏北路 166 号", companyId: "CO-CN-2001", createdAt: "2026-07-22 14:00", invoiceEnabled: true }),
        demoStore({ id: "ST-CN-202", name: "上海陆家嘴中心店", storeNo: "HY-SH-02", country: "CN", region: demoRegions.shanghai, address: "上海市浦东新区浦东南路 899 号", companyId: "CO-CN-2002", createdAt: "2026-07-22 14:20" }),
        demoStore({ id: "ST-CN-203", name: "杭州湖滨银泰店", storeNo: "HY-HZ-01", country: "CN", region: demoRegions.hangzhou, address: "杭州市上城区延安路 245 号", companyId: "CO-CN-2003", createdAt: "2026-07-22 14:40" }),
      ],
    }),
    demoBrand({
      id: "BR-CN-202",
      country: "CN",
      name: "寰宇优选（中国品牌）",
      shortName: "寰宇优选",
      description: "城市家庭日用与精选礼品品牌",
      createdAt: "2026-07-22 15:00",
      invoiceCompanyId: "CO-CN-2001",
      taxCategory: "生活用品",
      taxAlias: "生活用品",
      stores: [
        demoStore({ id: "ST-CN-204", name: "北京朝阳合生汇店", storeNo: "HY-BJ-01", country: "CN", region: demoRegions.beijing, address: "北京市朝阳区西大望路 21 号", companyId: "CO-CN-2001", createdAt: "2026-07-22 15:20", invoiceEnabled: true }),
        demoStore({ id: "ST-CN-205", name: "杭州万象城店", storeNo: "HY-HZ-02", country: "CN", region: demoRegions.hangzhou, address: "杭州市上城区富春路 701 号", companyId: "CO-CN-2003", createdAt: "2026-07-22 15:40" }),
        demoStore({ id: "ST-CN-206", name: "上海虹桥天地店", storeNo: "HY-SH-03", country: "CN", region: demoRegions.shanghai, address: "上海市闵行区申长路 688 号", createdAt: "2026-07-22 16:00", remark: "待关联门店" }),
      ],
    }),
  ];
}

function additionalDemoCustomers() {
  const malaysiaFoodCompanies = [
    demoCompany({ id: "CO-MY-3001", country: "MY", legalName: "Nanyang Dining Group Sdn. Bhd.", registrationNo: "202301019901", tin: "C23119012010", sst: "B16-2308-32000991", address: "Bukit Bintang, Kuala Lumpur", phone: "+60 3-2148 8818", email: "finance@nanyang-dining.example", industry: demoIndustries.dining, businessDesc: "马来西亚中式餐饮及门店经营", remark: "马来西亚餐饮业务总公司", createdAt: "2026-07-23 09:00", invoiceStatus: "opened" }),
    demoCompany({ id: "CO-MY-3002", country: "MY", type: "Branch", parentCompanyId: "CO-MY-3001", legalName: "Nanyang Dining Penang Sdn. Bhd.", registrationNo: "202401009902", tin: "C24109022010", sst: "B07-2403-32000992", address: "George Town, Pulau Pinang", industry: demoIndustries.dining, businessDesc: "槟城区域餐饮门店经营", remark: "槟城区域分公司", createdAt: "2026-07-23 09:20", invoiceStatus: "opened" }),
    demoCompany({ id: "CO-MY-3003", country: "MY", type: "Branch", parentCompanyId: "CO-MY-3001", legalName: "Nanyang Dining Johor Sdn. Bhd.", registrationNo: "202501009903", address: "Johor Bahru, Johor", industry: demoIndustries.dining, businessDesc: "新山区域餐饮门店经营", remark: "新山区域分公司", createdAt: "2026-07-23 09:40", invoiceStatus: "unopened" }),
  ];
  const malaysiaFoodBrands = [
    demoBrand({
      id: "BR-MY-301",
      country: "MY",
      name: "南洋小馆（马来西亚品牌）",
      shortName: "南洋小馆",
      industry: demoIndustries.dining,
      description: "马来西亚城市商圈中式餐饮品牌",
      createdAt: "2026-07-23 10:00",
      stores: [
        demoStore({ id: "ST-MY-301", name: "吉隆坡武吉免登店", storeNo: "NY-KL-01", country: "MY", region: demoRegions.kualaLumpur, address: "Bukit Bintang, Kuala Lumpur", companyId: "CO-MY-3001", createdAt: "2026-07-23 10:20", invoiceEnabled: true }),
        demoStore({ id: "ST-MY-302", name: "槟城葛尼百丽宫店", storeNo: "NY-PG-01", country: "MY", region: demoRegions.penang, address: "Gurney Paragon Mall, George Town", companyId: "CO-MY-3002", createdAt: "2026-07-23 10:40", invoiceEnabled: true }),
        demoStore({ id: "ST-MY-303", name: "新山富力广场店", storeNo: "NY-JB-01", country: "MY", region: demoRegions.johorBahru, address: "R&F Mall, Johor Bahru", companyId: "CO-MY-3003", createdAt: "2026-07-23 11:00" }),
      ],
    }),
    demoBrand({
      id: "BR-MY-302",
      country: "MY",
      name: "娘惹时光（马来西亚品牌）",
      shortName: "娘惹时光",
      industry: demoIndustries.dining,
      description: "娘惹风味正餐与轻食品牌",
      createdAt: "2026-07-23 11:20",
      stores: [
        demoStore({ id: "ST-MY-304", name: "吉隆坡中央市场店", storeNo: "NY-KL-02", country: "MY", region: demoRegions.kualaLumpur, address: "Central Market, Kuala Lumpur", companyId: "CO-MY-3001", createdAt: "2026-07-23 11:40", invoiceEnabled: true }),
        demoStore({ id: "ST-MY-305", name: "槟城海峡岸广场店", storeNo: "NY-PG-02", country: "MY", region: demoRegions.penang, address: "Straits Quay, George Town", companyId: "CO-MY-3002", createdAt: "2026-07-23 12:00" }),
        demoStore({ id: "ST-MY-306", name: "雪兰莪万达广场店", storeNo: "NY-SGR-01", country: "MY", region: demoRegions.petalingJaya, address: "1 Utama Shopping Centre, Petaling Jaya", createdAt: "2026-07-23 12:20", remark: "待关联门店" }),
      ],
    }),
  ];

  const starHarborCompanies = [
    demoCompany({ id: "CO-CN-4001", country: "CN", legalName: "深圳星港生活商业有限公司", registrationNo: "91440300MA5STAR001", address: "深圳市南山区深南大道 9668 号", industry: demoIndustries.fashion, businessDesc: "中国及香港市场生活方式品牌经营", remark: "中国业务总公司", createdAt: "2026-07-24 09:00", invoiceStatus: "opened" }),
    demoCompany({ id: "CO-CN-4002", country: "CN", type: "Branch", parentCompanyId: "CO-CN-4001", legalName: "深圳星港生活上海分公司", registrationNo: "91310106MA5STAR002", address: "上海市静安区南京西路 1266 号", industry: demoIndustries.fashion, businessDesc: "上海区域品牌门店经营", remark: "上海区域分公司", createdAt: "2026-07-24 09:20", invoiceStatus: "unopened" }),
    demoCompany({ id: "CO-MY-4001", country: "MY", legalName: "Star Harbour Lifestyle Malaysia Sdn. Bhd.", registrationNo: "202401014401", tin: "C2440144010", sst: "W10-2406-32004401", address: "Petaling Jaya, Selangor", industry: demoIndustries.fashion, businessDesc: "马来西亚生活方式品牌经营", remark: "马来西亚业务总公司", createdAt: "2026-07-24 09:40", invoiceStatus: "opened" }),
    demoCompany({ id: "CO-MY-4002", country: "MY", type: "Branch", parentCompanyId: "CO-MY-4001", legalName: "Star Harbour Lifestyle Johor Sdn. Bhd.", registrationNo: "202501014402", address: "Johor Bahru, Johor", industry: demoIndustries.fashion, businessDesc: "新山区域品牌门店经营", remark: "新山区域分公司", createdAt: "2026-07-24 10:00", invoiceStatus: "unopened" }),
  ];
  const starHarborBrands = [
    demoBrand({
      id: "BR-CN-401",
      country: "CN",
      name: "星港生活（中国品牌）",
      shortName: "星港生活",
      industry: demoIndustries.fashion,
      description: "中国城市生活方式及配饰品牌",
      createdAt: "2026-07-24 10:20",
      invoiceCompanyId: "CO-CN-4001",
      taxCategory: "服饰配件",
      taxAlias: "服饰配件",
      stores: [
        demoStore({ id: "ST-CN-401", name: "深圳万象天地店", storeNo: "SG-SZ-01", country: "CN", region: demoRegions.shenzhen, address: "深圳市南山区深南大道 9668 号", companyId: "CO-CN-4001", createdAt: "2026-07-24 10:40", invoiceEnabled: true }),
        demoStore({ id: "ST-CN-402", name: "上海兴业太古汇店", storeNo: "SG-SH-01", country: "CN", region: demoRegions.shanghai, address: "上海市静安区南京西路 789 号", companyId: "CO-CN-4002", createdAt: "2026-07-24 11:00" }),
        demoStore({ id: "ST-CN-403", name: "杭州湖滨步行街店", storeNo: "SG-HZ-01", country: "CN", region: demoRegions.hangzhou, address: "杭州市上城区湖滨路 20 号", createdAt: "2026-07-24 11:20", remark: "待关联门店" }),
      ],
    }),
    demoBrand({
      id: "BR-CN-402",
      country: "CN",
      name: "Harbour Select（香港品牌）",
      shortName: "Harbour Select",
      industry: demoIndustries.fashion,
      description: "香港都市精选配饰与礼品品牌",
      createdAt: "2026-07-24 11:40",
      invoiceCompanyId: "CO-CN-4001",
      taxCategory: "箱包配饰",
      taxAlias: "箱包",
      taxClassification: "1040207000000000000",
      taxShortName: "箱包",
      stores: [
        demoStore({ id: "ST-HK-401", name: "香港海港城店", storeNo: "HS-HK-01", country: "CN", region: demoRegions.hongKong, address: "Harbour City, Tsim Sha Tsui, Hong Kong", companyId: "CO-CN-4001", createdAt: "2026-07-24 12:00", invoiceEnabled: true }),
        demoStore({ id: "ST-HK-402", name: "香港太古广场店", storeNo: "HS-HK-02", country: "CN", region: demoRegions.hongKong, address: "Pacific Place, Admiralty, Hong Kong", companyId: "CO-CN-4001", createdAt: "2026-07-24 12:20", invoiceEnabled: true }),
      ],
    }),
    demoBrand({
      id: "BR-MY-401",
      country: "MY",
      name: "Star Harbour（马来西亚品牌）",
      shortName: "Star Harbour",
      industry: demoIndustries.fashion,
      description: "马来西亚城市生活方式品牌",
      createdAt: "2026-07-24 12:40",
      stores: [
        demoStore({ id: "ST-MY-401", name: "吉隆坡谷中城店", storeNo: "SH-KL-01", country: "MY", region: demoRegions.kualaLumpur, address: "Mid Valley Megamall, Kuala Lumpur", companyId: "CO-MY-4001", createdAt: "2026-07-24 13:00", invoiceEnabled: true }),
        demoStore({ id: "ST-MY-402", name: "雪兰莪双威伟乐城店", storeNo: "SH-SGR-01", country: "MY", region: demoRegions.petalingJaya, address: "Sunway Velocity Mall, Petaling Jaya", companyId: "CO-MY-4001", createdAt: "2026-07-24 13:20" }),
        demoStore({ id: "ST-MY-403", name: "新山地不佬永旺店", storeNo: "SH-JB-01", country: "MY", region: demoRegions.johorBahru, address: "AEON Mall Tebrau City, Johor Bahru", companyId: "CO-MY-4002", createdAt: "2026-07-24 13:40" }),
      ],
    }),
  ];

  const pendingCompanies = [
    demoCompany({ id: "CO-CN-5001", country: "CN", legalName: "上海新锐零售科技有限公司", registrationNo: "91310115MA5NEW0001", address: "上海市浦东新区张江路 88 号", industry: demoIndustries.home, businessDesc: "新零售门店与生活用品经营", remark: "中国业务总公司，发票功能待开通", createdAt: "2026-07-25 09:00", invoiceStatus: "unopened" }),
    demoCompany({ id: "CO-MY-5001", country: "MY", legalName: "New Retail Lab Malaysia Sdn. Bhd.", registrationNo: "202501015501", address: "Kuala Lumpur", industry: demoIndustries.home, businessDesc: "马来西亚新零售门店经营", remark: "马来西亚业务总公司，资料待补充", createdAt: "2026-07-25 09:20", invoiceStatus: "unopened" }),
  ];
  const pendingBrands = [
    demoBrand({
      id: "BR-CN-501",
      country: "CN",
      name: "新锐生活（中国品牌）",
      shortName: "新锐生活",
      description: "新零售生活用品试点品牌",
      createdAt: "2026-07-25 09:40",
      stores: [
        demoStore({ id: "ST-CN-501", name: "上海张江试点店", storeNo: "NR-SH-01", country: "CN", region: demoRegions.shanghai, address: "上海市浦东新区张江路 88 号", companyId: "CO-CN-5001", createdAt: "2026-07-25 10:00" }),
        demoStore({ id: "ST-CN-502", name: "杭州未来社区店", storeNo: "NR-HZ-01", country: "CN", region: demoRegions.hangzhou, address: "杭州市上城区新业路 228 号", createdAt: "2026-07-25 10:20", remark: "待关联门店" }),
      ],
    }),
    demoBrand({
      id: "BR-MY-501",
      country: "MY",
      name: "New Retail Lab（马来西亚品牌）",
      shortName: "New Retail Lab",
      description: "马来西亚新零售试点品牌",
      createdAt: "2026-07-25 10:40",
      stores: [
        demoStore({ id: "ST-MY-501", name: "吉隆坡孟沙试点店", storeNo: "NR-KL-01", country: "MY", region: demoRegions.kualaLumpur, address: "Bangsar, Kuala Lumpur", companyId: "CO-MY-5001", createdAt: "2026-07-25 11:00" }),
        demoStore({ id: "ST-MY-502", name: "雪兰莪梳邦试点店", storeNo: "NR-SGR-01", country: "MY", region: demoRegions.petalingJaya, address: "Subang Jaya, Selangor", createdAt: "2026-07-25 11:20", remark: "待关联门店" }),
      ],
    }),
  ];

  return [
    demoCustomer({
      id: "160247795680",
      name: "南洋餐饮马来西亚业务演示客户",
      shortName: "南洋餐饮马来",
      industry: demoIndustries.dining,
      projectNo: "KA-NYD-A000003",
      contactName: "Aisha Lim",
      contactPhone: "+60 12-330 8818",
      contactEmail: "aisha@nanyang-dining.example",
      salesName: "芳雨晴",
      customerExecutive: "柳智妍",
      remark: "用于演示马来西亚总分公司、餐饮品牌和门店关系",
      createdAt: "2026-07-23 08:30:00",
      productOpen: true,
      companies: malaysiaFoodCompanies,
      brands: malaysiaFoodBrands,
    }),
    demoCustomer({
      id: "160247795681",
      name: "星港生活跨境业务演示客户",
      shortName: "星港跨境",
      industry: demoIndustries.fashion,
      projectNo: "KA-SGH-A000004",
      contactName: "陈思远",
      contactPhone: "0755-8899 2200",
      contactEmail: "contact@star-harbour.example",
      salesName: "Stanley",
      customerExecutive: "殷超",
      remark: "用于演示中国、香港名称品牌和马来西亚品牌的跨境经营",
      createdAt: "2026-07-24 08:30:00",
      productOpen: true,
      companies: starHarborCompanies,
      brands: starHarborBrands,
    }),
    demoCustomer({
      id: "160247795682",
      name: "新锐零售待开通演示客户",
      shortName: "新锐待开通",
      customerType: "ISV",
      industry: demoIndustries.home,
      projectNo: "ISV-NRL-A000005",
      contactName: "周欣",
      contactPhone: "021-5088 6600",
      contactEmail: "contact@new-retail-lab.example",
      salesName: "芳雨晴",
      customerExecutive: "柳智妍",
      remark: "用于演示客户和公司电子发票功能均未开通的状态",
      createdAt: "2026-07-25 08:30:00",
      productOpen: false,
      companies: pendingCompanies,
      brands: pendingBrands,
    }),
  ];
}

enrichInitialDemoCustomers();
initialCustomers.push(...additionalDemoCustomers());

const state = {
  customers: structuredClone(initialCustomers),
  view: "customer-list",
  currentCustomerId: "160247797573",
  currentCompanyId: "",
  currentBrandId: "",
  customerTab: "basic",
  companyTab: "master",
  companyFunctionView: "list",
  brandTab: "info",
  settingsView: "brand-list",
  settingsTab: "stores",
  settingsImportKind: "rules",
  settingsImportStage: "upload",
  settingsImportFileName: "",
  settingsImportRemark: "",
  settingsImportTaskId: "",
  settingsImportTasks: {},
  settingsBrandNameKeyword: "",
  settingsBrandIdKeyword: "",
  settingsStoreNameKeyword: "",
  settingsStoreNoKeyword: "",
  settingsRuleCategoryKeyword: "",
  settingsRuleTaxCodeKeyword: "",
  settingsFallbackTaxNoKeyword: "",
  settingsFallbackTaxCodeKeyword: "",
  itemNameSourceEditing: false,
  applicationEditMode: {
    qr: false,
    selfReissue: false,
    page: false,
  },
  applicationDraft: null,
  applicationDraftBrandId: "",
  applicationErrors: {
    qr: "",
    selfReissue: "",
    page: "",
  },
  customerNameKeyword: "",
  customerShortNameKeyword: "",
  customerIdKeyword: "",
  customerSalesKeyword: "",
  customerTypeKeyword: "",
  companyCountryKeyword: "",
  companyNameKeyword: "",
  companyRegistrationKeyword: "",
  companyTypeKeyword: "",
  companyInvoiceStatusKeyword: "",
  companyBranchCountryKeyword: "",
  companyBranchNameKeyword: "",
  companyBranchRegistrationKeyword: "",
  companyBranchTypeKeyword: "",
  companyBranchInvoiceStatusKeyword: "",
  brandNameKeyword: "",
  brandIdKeyword: "",
  brandStoreIdKeyword: "",
  brandStoreNameKeyword: "",
  brandStoreNoKeyword: "",
  brandLogoSchemeDraft: null,
  brandLogoSchemeFileError: "",
  customerDraft: null,
  customerErrors: {},
  companyDraft: null,
  companyErrors: {},
  companyInvoiceOpenStep: 1,
  companyInvoiceProductSelected: true,
  companyInvoiceOpenError: "",
  companyInvoiceMissingLicenses: [],
  companyStoreBrandKeyword: "",
  companyStoreNameKeyword: "",
  companyStoreNoKeyword: "",
  companyStoreIdKeyword: "",
  companyStorePickerBrandKeyword: "",
  companyStorePickerNameKeyword: "",
  companyStorePickerNoKeyword: "",
  companyStorePickerIdKeyword: "",
  companyStorePickerOnlyAvailable: false,
  companyStoreSelectedIds: new Set(),
  companyStoreRemovingId: "",
  storeDraft: null,
  modalContext: null,
};

const countries = {
  MY: "马来西亚",
  CN: "中国",
};

const storeRegionCatalog = {
  CN: [
    {
      code: "CN-11",
      name: "北京市",
      children: [
        {
          code: "CN-11-01",
          name: "北京市",
          children: [
            { code: "CN-11-DC", name: "东城区" },
            { code: "CN-11-CY", name: "朝阳区" },
            { code: "CN-11-HD", name: "海淀区" },
          ],
        },
      ],
    },
    {
      code: "CN-13",
      name: "河北省",
      children: [
        {
          code: "CN-13-01",
          name: "石家庄市",
          children: [
            { code: "CN-13-01-CH", name: "长安区" },
            { code: "CN-13-01-QX", name: "桥西区" },
          ],
        },
        {
          code: "CN-13-03",
          name: "秦皇岛市",
          children: [
            { code: "CN-13-03-HG", name: "海港区" },
            { code: "CN-13-03-BD", name: "北戴河区" },
          ],
        },
      ],
    },
    {
      code: "CN-31",
      name: "上海市",
      children: [
        {
          code: "CN-31-01",
          name: "上海市",
          children: [
            { code: "CN-31-JA", name: "静安区" },
            { code: "CN-31-PD", name: "浦东新区" },
          ],
        },
      ],
    },
    {
      code: "CN-81",
      name: "香港特别行政区",
      children: [
        {
          code: "CN-81-HK",
          name: "香港岛",
          children: [
            { code: "CN-81-HK-CW", name: "中西区" },
            { code: "CN-81-HK-WC", name: "湾仔区" },
          ],
        },
      ],
    },
  ],
  MY: [
    {
      code: "10",
      name: "Selangor",
      children: [
        {
          code: "MY-10-PET",
          name: "Petaling District",
          children: [
            { code: "MY-10-PJ", name: "Petaling Jaya" },
            { code: "MY-10-SAC", name: "Shah Alam" },
            { code: "MY-10-SUB", name: "Subang Jaya" },
          ],
        },
        {
          code: "MY-10-KLG",
          name: "Klang District",
          children: [{ code: "MY-10-KLG-CITY", name: "Klang" }],
        },
      ],
    },
    {
      code: "07",
      name: "Pulau Pinang",
      children: [
        {
          code: "MY-07-TL",
          name: "Timur Laut District",
          children: [
            { code: "MY-07-GT", name: "George Town" },
            { code: "MY-07-TJ", name: "Tanjung Tokong" },
          ],
        },
        {
          code: "MY-07-BD",
          name: "Barat Daya District",
          children: [{ code: "MY-07-BAYAN", name: "Bayan Lepas" }],
        },
      ],
    },
    {
      code: "01",
      name: "Johor",
      children: [
        {
          code: "MY-01-JB",
          name: "Johor Bahru District",
          children: [
            { code: "MY-01-JB-CITY", name: "Johor Bahru" },
            { code: "MY-01-ISK", name: "Iskandar Puteri" },
          ],
        },
      ],
    },
    {
      code: "14",
      name: "Federal Territory of Kuala Lumpur",
      skipLevelTwo: true,
      localities: [
        { code: "MY-14-KUL", name: "Kuala Lumpur" },
        { code: "MY-14-BB", name: "Bukit Bintang" },
      ],
    },
  ],
};

const customerTypes = {
  KA: "KA客户",
  ISV: "ISV客户",
};

const companyTypes = {
  Head: "总公司",
  Branch: "分公司",
};

const salesOptions = [
  { name: "芳雨晴", organization: "大客户/总部/Stanley的组织", executive: "柳智妍" },
  { name: "Stanley", organization: "大客户/总部/Stanley的组织", executive: "殷超" },
  { name: "唐远翰", organization: "大客户/华东区域组织", executive: "朱李铭" },
];

const sqbIndustryCatalog = [
  {
    code: "001",
    name: "餐饮",
    children: [
      ["001003", "其他中餐"],
      ["001004", "中式火锅"],
      ["001005", "日韩料理"],
      ["001006", "西餐/西式简餐"],
      ["001007", "自助餐厅"],
      ["001008", "咖啡厅"],
      ["001010", "快餐"],
      ["001011", "小吃"],
      ["001012", "烘焙糕点"],
      ["001013", "甜品饮品"],
      ["001014", "熟食"],
      ["001015", "烧烤"],
      ["001016", "东南亚菜"],
    ],
  },
  {
    code: "002",
    name: "生活百货",
    children: [
      ["002002", "美妆个护"],
      ["002004", "烟酒店"],
      ["002005", "水果店"],
      ["002007", "生鲜类食品"],
      ["002009", "钟表/眼镜"],
      ["002010", "服饰箱包"],
      ["002011", "金银/珠宝/玉石类饰品"],
      ["002012", "成人用品"],
      ["002013", "母婴用品/儿童玩具"],
      ["002015", "办公设备/文具/耗材"],
      ["002016", "电子元器件/仪器仪表/机械设备及配件"],
      ["002017", "运动户外用品"],
      ["002019", "便利店"],
      ["002020", "杂货/五金/建材"],
      ["002021", "超市"],
      ["002022", "数码产品及配件"],
      ["002023", "包装食品"],
      ["002024", "鲜花/绿植/礼品"],
      ["002025", "宠物/宠物用品"],
      ["002026", "家电/家居/家纺用品"],
      ["002027", "百货商场"],
      ["002028", "自动售卖机"],
      ["002029", "图书/音像制品/乐器"],
      ["002030", "文物类收藏品"],
      ["002031", "非文物类收藏品/工艺品"],
    ],
  },
  {
    code: "003",
    name: "生活服务",
    children: [
      ["003002", "美甲/美睫/纹绣"],
      ["003005", "美容/SPA/美发/纤体瘦身"],
      ["003006", "物流/快递"],
      ["003007", "宠物护理/宠物医院"],
      ["003008", "广告/会展/活动策划"],
      ["003009", "家政/维修服务"],
      ["003010", "咨询/金融咨询/管理咨询等"],
      ["003011", "律师事务所"],
      ["003012", "婚庆服务"],
      ["003013", "摄影"],
      ["003014", "房屋中介"],
      ["003015", "生活缴费"],
      ["003016", "加油站"],
      ["003017", "搬家/回收"],
      ["003018", "装修设计/施工"],
      ["003019", "电子产品维修/美容"],
      ["003020", "电信通讯/营业厅"],
      ["003021", "慈善基金会"],
    ],
  },
  {
    code: "004",
    name: "医疗健康",
    children: [
      ["004010", "药店/药房"],
      ["004011", "私立/民营医院/诊所"],
      ["004017", "公立医院"],
      ["004018", "体检中心"],
      ["004019", "医疗美容/医疗整形"],
    ],
  },
  {
    code: "005",
    name: "休闲娱乐",
    children: [
      ["005003", "俱乐部/休闲会所"],
      ["005004", "运动场馆/健身房"],
      ["005005", "酒吧"],
      ["005006", "足疗按摩/浴场"],
      ["005007", "棋牌室"],
      ["005008", "桌游/轰趴/密室"],
      ["005011", "彩票代销"],
      ["005012", "养生会所"],
      ["005013", "KTV/游乐场/电子游戏厅"],
      ["005014", "网吧/网咖"],
      ["005015", "茶楼/茶馆/茶社"],
      ["005016", "亲子游乐"],
      ["005017", "影院/影城"],
      ["005018", "DIY手工坊"],
      ["005019", "娱乐/演出/赛事等门票销售"],
    ],
  },
  {
    code: "007",
    name: "交通出行/票务旅游",
    children: [
      ["007001", "旅馆/酒店"],
      ["007003", "机票/火车票/船票/车票等交通票务"],
      ["007005", "旅行社"],
      ["007007", "汽车美容/配件/维修保养"],
      ["007008", "摩托/电动车/自行车/配件"],
      ["007009", "二手车/租车"],
      ["007010", "汽车4S店"],
      ["007011", "景区/度假区"],
      ["007012", "寺庙/宗教场所"],
    ],
  },
  {
    code: "012",
    name: "教育培训",
    children: [
      ["012001", "职业技能培训"],
      ["012003", "语言培训"],
      ["012004", "升学辅导"],
      ["012005", "艺术培训"],
      ["012006", "少儿教育"],
      ["012009", "民办中小幼"],
      ["012010", "公立中小幼"],
      ["012011", "民办大学及学院"],
      ["012012", "公立大学及学院"],
    ],
  },
];

const malaysiaIndustryMappings = {
  "002023": {
    standard: "MSIC",
    code: "47214",
    name: "Retail sale of confectionery",
    enabled: true,
  },
};

const invoiceStatuses = {
  unopened: { label: "未开通", className: "" },
  opening: { label: "开通中", className: "primary" },
  opened: { label: "已开通", className: "success" },
  failed: { label: "开通失败", className: "danger" },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function industryLevelOne(code) {
  return sqbIndustryCatalog.find((industry) => industry.code === code);
}

function industryLevelTwo(levelOneCode, levelTwoCode) {
  return industryLevelOne(levelOneCode)?.children.find(([code]) => code === levelTwoCode);
}

function industryDisplay(record, compact = false) {
  if (!record?.industryLevelTwoCode) return "-";
  if (compact) return record.industryLevelTwoName || record.industryLevelTwoCode;
  return `${record.industryLevelOneName} / ${record.industryLevelTwoName}（${record.industryLevelTwoCode}）`;
}

function applyIndustrySelection(record, levelOneCode, levelTwoCode) {
  const levelOne = industryLevelOne(levelOneCode);
  const levelTwo = industryLevelTwo(levelOneCode, levelTwoCode);
  record.industryLevelOneCode = levelOne?.code || "";
  record.industryLevelOneName = levelOne?.name || "";
  record.industryLevelTwoCode = levelTwo?.[0] || "";
  record.industryLevelTwoName = levelTwo?.[1] || "";
}

function readIndustrySelectionFromForm(record, prefix) {
  const levelOneCode = document.getElementById(`${prefix}IndustryLevelOne`)?.value || "";
  const levelTwoCode = document.getElementById(`${prefix}IndustryLevelTwo`)?.value || "";
  applyIndustrySelection(record, levelOneCode, levelTwoCode);
}

function renderIndustryLevelTwoOptions(prefix, levelOneCode, selectedLevelOne, selectedLevelTwo) {
  const children = industryLevelOne(levelOneCode)?.children || [];
  if (!children.length) return `<div class="industry-cascader-empty">暂无二级行业</div>`;
  return children
    .map(
      ([code, name]) => `
        <button
          class="industry-cascader-option ${selectedLevelOne === levelOneCode && selectedLevelTwo === code ? "selected" : ""}"
          type="button"
          data-action="select-industry-level-two"
          data-prefix="${prefix}"
          data-level-one="${levelOneCode}"
          data-level-two="${code}"
        >
          <span>${escapeHtml(name)}</span>
        </button>
      `,
    )
    .join("");
}

function renderIndustryCascader({ prefix, record, error = "" }) {
  const selectedLevelOne = record.industryLevelOneCode || "";
  const selectedLevelTwo = record.industryLevelTwoCode || "";
  const activeLevelOne = selectedLevelOne || sqbIndustryCatalog[0]?.code || "";
  const selectedPath =
    selectedLevelOne && selectedLevelTwo
      ? `${record.industryLevelOneName || industryLevelOne(selectedLevelOne)?.name || ""} / ${record.industryLevelTwoName || industryLevelTwo(selectedLevelOne, selectedLevelTwo)?.[1] || ""}`
      : "";
  return `
    <div class="industry-cascader" data-prefix="${prefix}" data-active-level-one="${activeLevelOne}">
      <input id="${prefix}IndustryLevelOne" type="hidden" value="${escapeHtml(selectedLevelOne)}" />
      <input id="${prefix}IndustryLevelTwo" type="hidden" value="${escapeHtml(selectedLevelTwo)}" />
      <button
        class="industry-cascader-trigger ${error ? "field-error" : ""}"
        type="button"
        data-action="toggle-industry-cascader"
        data-prefix="${prefix}"
        aria-expanded="false"
        aria-controls="${prefix}IndustryCascaderPanel"
      >
        <span class="industry-cascader-value ${selectedPath ? "" : "placeholder"}">${escapeHtml(selectedPath || "请选择所属行业")}</span>
        <span class="industry-cascader-arrow" aria-hidden="true">⌄</span>
      </button>
      <div class="industry-cascader-panel" id="${prefix}IndustryCascaderPanel" hidden>
        <div class="industry-cascader-column industry-cascader-level-one">
          ${sqbIndustryCatalog
            .map(
              (industry) => `
                <button
                  class="industry-cascader-option has-children ${activeLevelOne === industry.code ? "active" : ""} ${selectedLevelOne === industry.code ? "selected" : ""}"
                  type="button"
                  data-action="select-industry-level-one"
                  data-prefix="${prefix}"
                  data-level-one="${industry.code}"
                >
                  <span>${escapeHtml(industry.name)}</span><span aria-hidden="true">›</span>
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="industry-cascader-column industry-cascader-level-two">
          ${renderIndustryLevelTwoOptions(prefix, activeLevelOne, selectedLevelOne, selectedLevelTwo)}
        </div>
      </div>
    </div>
  `;
}

function renderIndustryFields({ prefix, record, error = "", legacy = false }) {
  const cascader = renderIndustryCascader({ prefix, record, error });
  if (legacy) {
    return `
      <div class="legacy-form-row required">
        <span class="legacy-form-label">所属行业：</span>
        <div>${cascader}<span class="field-message">${escapeHtml(error)}</span></div>
      </div>
    `;
  }
  return `
    <div class="field required"><span>所属行业</span>${cascader}<span class="field-message">${escapeHtml(error)}</span></div>
  `;
}

function closeIndustryCascaders(except = null) {
  modalRoot.querySelectorAll(".industry-cascader").forEach((cascader) => {
    if (cascader === except) return;
    const panel = cascader.querySelector(".industry-cascader-panel");
    const trigger = cascader.querySelector(".industry-cascader-trigger");
    if (panel) panel.hidden = true;
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    cascader.classList.remove("open");
  });
}

function toggleIndustryCascader(prefix) {
  const cascader = modalRoot.querySelector(`.industry-cascader[data-prefix="${prefix}"]`);
  if (!cascader) return;
  const panel = cascader.querySelector(".industry-cascader-panel");
  const trigger = cascader.querySelector(".industry-cascader-trigger");
  const willOpen = panel.hidden;
  closeIndustryCascaders(cascader);
  if (willOpen) {
    const selectedLevelOne = document.getElementById(`${prefix}IndustryLevelOne`)?.value || "";
    activateIndustryLevelOne(prefix, selectedLevelOne || sqbIndustryCatalog[0]?.code || "");
  }
  panel.hidden = !willOpen;
  trigger.setAttribute("aria-expanded", String(willOpen));
  cascader.classList.toggle("open", willOpen);
}

function activateIndustryLevelOne(prefix, levelOneCode) {
  const cascader = modalRoot.querySelector(`.industry-cascader[data-prefix="${prefix}"]`);
  if (!cascader) return;
  const selectedLevelOne = document.getElementById(`${prefix}IndustryLevelOne`)?.value || "";
  const selectedLevelTwo = document.getElementById(`${prefix}IndustryLevelTwo`)?.value || "";
  cascader.dataset.activeLevelOne = levelOneCode;
  cascader.querySelectorAll(".industry-cascader-level-one .industry-cascader-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.levelOne === levelOneCode);
  });
  const levelTwoColumn = cascader.querySelector(".industry-cascader-level-two");
  levelTwoColumn.innerHTML = renderIndustryLevelTwoOptions(prefix, levelOneCode, selectedLevelOne, selectedLevelTwo);
}

function selectIndustryLevelTwo(prefix, levelOneCode, levelTwoCode) {
  const cascader = modalRoot.querySelector(`.industry-cascader[data-prefix="${prefix}"]`);
  const levelOne = industryLevelOne(levelOneCode);
  const levelTwo = industryLevelTwo(levelOneCode, levelTwoCode);
  if (!cascader || !levelOne || !levelTwo) return;
  document.getElementById(`${prefix}IndustryLevelOne`).value = levelOneCode;
  document.getElementById(`${prefix}IndustryLevelTwo`).value = levelTwoCode;
  const value = cascader.querySelector(".industry-cascader-value");
  value.textContent = `${levelOne.name} / ${levelTwo[1]}`;
  value.classList.remove("placeholder");
  cascader.querySelector(".industry-cascader-trigger").classList.remove("field-error");
  cascader.closest(".field, .legacy-form-row")?.querySelector(".field-message")?.replaceChildren();
  cascader.querySelectorAll(".industry-cascader-level-one .industry-cascader-option").forEach((option) => {
    option.classList.toggle("selected", option.dataset.levelOne === levelOneCode);
  });
  cascader.querySelectorAll(".industry-cascader-level-two .industry-cascader-option").forEach((option) => {
    option.classList.toggle("selected", option.dataset.levelTwo === levelTwoCode);
  });
  closeIndustryCascaders();
}

function storeRegionLevelOne(countryCode, levelOneCode) {
  return (storeRegionCatalog[countryCode] || []).find((item) => item.code === levelOneCode);
}

function storeRegionLevelTwo(countryCode, levelOneCode, levelTwoCode) {
  return storeRegionLevelOne(countryCode, levelOneCode)?.children?.find((item) => item.code === levelTwoCode);
}

function storeRegionLevelThree(countryCode, levelOneCode, levelTwoCode, levelThreeCode) {
  const levelOne = storeRegionLevelOne(countryCode, levelOneCode);
  const options = levelOne?.skipLevelTwo
    ? levelOne.localities || []
    : storeRegionLevelTwo(countryCode, levelOneCode, levelTwoCode)?.children || [];
  return options.find((item) => item.code === levelThreeCode);
}

function storeRegionPath(record) {
  if (record.regionPath) return record.regionPath;
  return [record.regionLevel1Name, record.regionLevel2Name, record.regionLevel3Name].filter(Boolean).join(" / ");
}

function renderStoreRegionLevelTwoOptions(countryCode, activeLevelOne, activeLevelTwo, selectedLevelTwo) {
  const levelOne = storeRegionLevelOne(countryCode, activeLevelOne);
  if (!levelOne) return `<div class="industry-cascader-empty">请先选择第一级地区</div>`;
  if (levelOne.skipLevelTwo) {
    return `<div class="store-region-skip"><strong>无需选择行政区</strong><span>可直接选择城市/城镇</span></div>`;
  }
  return (levelOne.children || [])
    .map(
      (item) => `
        <button
          class="industry-cascader-option has-children ${activeLevelTwo === item.code ? "active" : ""} ${selectedLevelTwo === item.code ? "selected" : ""}"
          type="button"
          data-action="select-store-region-level-two"
          data-country="${countryCode}"
          data-level-one="${levelOne.code}"
          data-level-two="${item.code}"
        >
          <span>${escapeHtml(item.name)}</span><span aria-hidden="true">›</span>
        </button>
      `,
    )
    .join("");
}

function renderStoreRegionLevelThreeOptions(countryCode, activeLevelOne, activeLevelTwo, selectedLevelThree) {
  const levelOne = storeRegionLevelOne(countryCode, activeLevelOne);
  if (!levelOne) return `<div class="industry-cascader-empty">请先选择第一级地区</div>`;
  const options = levelOne.skipLevelTwo
    ? levelOne.localities || []
    : storeRegionLevelTwo(countryCode, activeLevelOne, activeLevelTwo)?.children || [];
  if (!options.length) return `<div class="industry-cascader-empty">${levelOne.skipLevelTwo ? "暂无城市/城镇" : "请先选择行政区"}</div>`;
  return options
    .map(
      (item) => `
        <button
          class="industry-cascader-option ${selectedLevelThree === item.code ? "selected" : ""}"
          type="button"
          data-action="select-store-region-level-three"
          data-country="${countryCode}"
          data-level-one="${levelOne.code}"
          data-level-two="${levelOne.skipLevelTwo ? "" : activeLevelTwo}"
          data-level-three="${item.code}"
        >
          <span>${escapeHtml(item.name)}</span>
        </button>
      `,
    )
    .join("");
}

function renderStoreRegionCascader(record, countryCode) {
  const catalog = storeRegionCatalog[countryCode] || [];
  const selectedLevelOne = record.regionLevel1Code || "";
  const selectedLevelTwo = record.regionLevel2Code || "";
  const selectedLevelThree = record.regionLevel3Code || "";
  const activeLevelOne = selectedLevelOne || catalog[0]?.code || "";
  const activeLevelOneItem = storeRegionLevelOne(countryCode, activeLevelOne);
  const activeLevelTwo = activeLevelOneItem?.skipLevelTwo
    ? ""
    : selectedLevelOne === activeLevelOne && selectedLevelTwo
      ? selectedLevelTwo
      : activeLevelOneItem?.children?.[0]?.code || "";
  return `
    <div
      class="industry-cascader store-region-cascader"
      data-country="${countryCode}"
      data-active-level-one="${activeLevelOne}"
      data-active-level-two="${activeLevelTwo}"
    >
      <input id="storeRegionLevelOne" type="hidden" value="${escapeHtml(selectedLevelOne)}" />
      <input id="storeRegionLevelTwo" type="hidden" value="${escapeHtml(selectedLevelTwo)}" />
      <input id="storeRegionLevelThree" type="hidden" value="${escapeHtml(selectedLevelThree)}" />
      <button
        class="industry-cascader-trigger store-region-cascader-trigger"
        type="button"
        data-action="toggle-store-region-cascader"
        aria-expanded="false"
        aria-controls="storeRegionCascaderPanel"
      >
        <span class="industry-cascader-value ${storeRegionPath(record) ? "" : "placeholder"}">${escapeHtml(storeRegionPath(record) || "请选择所属地区")}</span>
        <span class="industry-cascader-arrow" aria-hidden="true">⌄</span>
      </button>
      <div class="industry-cascader-panel store-region-cascader-panel" id="storeRegionCascaderPanel" hidden>
        <div class="industry-cascader-column store-region-level-one">
          ${catalog
            .map(
              (item) => `
                <button
                  class="industry-cascader-option has-children ${activeLevelOne === item.code ? "active" : ""} ${selectedLevelOne === item.code ? "selected" : ""}"
                  type="button"
                  data-action="select-store-region-level-one"
                  data-country="${countryCode}"
                  data-level-one="${item.code}"
                >
                  <span>${escapeHtml(item.name)}</span><span aria-hidden="true">›</span>
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="industry-cascader-column store-region-level-two">
          ${renderStoreRegionLevelTwoOptions(countryCode, activeLevelOne, activeLevelTwo, selectedLevelTwo)}
        </div>
        <div class="industry-cascader-column store-region-level-three">
          ${renderStoreRegionLevelThreeOptions(countryCode, activeLevelOne, activeLevelTwo, selectedLevelThree)}
        </div>
      </div>
    </div>
  `;
}

function toggleStoreRegionCascader() {
  const cascader = modalRoot.querySelector(".store-region-cascader");
  if (!cascader) return;
  const panel = cascader.querySelector(".store-region-cascader-panel");
  const trigger = cascader.querySelector(".store-region-cascader-trigger");
  const willOpen = panel.hidden;
  closeIndustryCascaders(cascader);
  panel.hidden = !willOpen;
  trigger.setAttribute("aria-expanded", String(willOpen));
  cascader.classList.toggle("open", willOpen);
}

function activateStoreRegionLevelOne(countryCode, levelOneCode) {
  const cascader = modalRoot.querySelector(".store-region-cascader");
  const levelOne = storeRegionLevelOne(countryCode, levelOneCode);
  if (!cascader || !levelOne) return;
  const activeLevelTwo = levelOne.skipLevelTwo ? "" : levelOne.children?.[0]?.code || "";
  cascader.dataset.activeLevelOne = levelOneCode;
  cascader.dataset.activeLevelTwo = activeLevelTwo;
  cascader.querySelectorAll(".store-region-level-one .industry-cascader-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.levelOne === levelOneCode);
  });
  cascader.querySelector(".store-region-level-two").innerHTML = renderStoreRegionLevelTwoOptions(
    countryCode,
    levelOneCode,
    activeLevelTwo,
    document.getElementById("storeRegionLevelTwo")?.value || "",
  );
  cascader.querySelector(".store-region-level-three").innerHTML = renderStoreRegionLevelThreeOptions(
    countryCode,
    levelOneCode,
    activeLevelTwo,
    document.getElementById("storeRegionLevelThree")?.value || "",
  );
}

function activateStoreRegionLevelTwo(countryCode, levelOneCode, levelTwoCode) {
  const cascader = modalRoot.querySelector(".store-region-cascader");
  if (!cascader || !storeRegionLevelTwo(countryCode, levelOneCode, levelTwoCode)) return;
  cascader.dataset.activeLevelTwo = levelTwoCode;
  cascader.querySelectorAll(".store-region-level-two .industry-cascader-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.levelTwo === levelTwoCode);
  });
  cascader.querySelector(".store-region-level-three").innerHTML = renderStoreRegionLevelThreeOptions(
    countryCode,
    levelOneCode,
    levelTwoCode,
    document.getElementById("storeRegionLevelThree")?.value || "",
  );
}

function selectStoreRegion(countryCode, levelOneCode, levelTwoCode, levelThreeCode) {
  const cascader = modalRoot.querySelector(".store-region-cascader");
  const levelOne = storeRegionLevelOne(countryCode, levelOneCode);
  const levelTwo = levelOne?.skipLevelTwo ? null : storeRegionLevelTwo(countryCode, levelOneCode, levelTwoCode);
  const levelThree = storeRegionLevelThree(countryCode, levelOneCode, levelTwoCode, levelThreeCode);
  if (!cascader || !levelOne || (!levelOne.skipLevelTwo && !levelTwo) || !levelThree) return;
  document.getElementById("storeRegionLevelOne").value = levelOne.code;
  document.getElementById("storeRegionLevelTwo").value = levelTwo?.code || "";
  document.getElementById("storeRegionLevelThree").value = levelThree.code;
  const path = [levelOne.name, levelTwo?.name, levelThree.name].filter(Boolean).join(" / ");
  const value = cascader.querySelector(".industry-cascader-value");
  value.textContent = path;
  value.classList.remove("placeholder");
  cascader.querySelector(".store-region-cascader-trigger").classList.remove("field-error");
  cascader.closest(".field")?.querySelector(".field-message")?.replaceChildren();
  closeIndustryCascaders();
}

function malaysiaIndustryMapping(company) {
  const mapping = malaysiaIndustryMappings[company?.industryLevelTwoCode];
  return mapping?.enabled ? mapping : null;
}

function nowText() {
  return "2026-07-27 14:30";
}

function uid(prefix) {
  return `${prefix}-${String(Date.now()).slice(-6)}`;
}

function nextCustomerId() {
  return `160247${String(Date.now()).slice(-6)}`;
}

function currentCustomer() {
  return state.customers.find((customer) => customer.id === state.currentCustomerId) || state.customers[0];
}

function currentCompany() {
  return currentCustomer().companies.find((company) => company.id === state.currentCompanyId);
}

function currentBrand() {
  const customer = currentCustomer();
  return customer.brands.find((brand) => brand.id === state.currentBrandId) || customer.brands[0];
}

function companyName(customer, companyId) {
  return customer.companies.find((company) => company.id === companyId)?.legalName || "-";
}

function parentCompanyName(customer, company) {
  if ((company.type || "Head") !== "Branch") return "-";
  return companyName(customer, company.parentCompanyId);
}

function statusTag(status) {
  const item = invoiceStatuses[status] || invoiceStatuses.unopened;
  return `<span class="tag ${item.className}">${item.label}</span>`;
}

function associationTag(status) {
  const map = {
    associated: ["已关联", "success"],
    unassociated: ["未关联", "warning"],
    conflict: ["关联冲突", "danger"],
  };
  const [label, className] = map[status] || map.unassociated;
  return `<span class="tag ${className}">${label}</span>`;
}

function emptyState(title, detail = "") {
  return `<div class="empty-state"><div><strong>${escapeHtml(title)}</strong>${detail ? `<span>${escapeHtml(detail)}</span>` : ""}</div></div>`;
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal({ title, body, actions, large = false, drawer = false, className = "" }) {
  modalRoot.innerHTML = `
    <div class="modal-backdrop ${drawer ? "drawer-backdrop" : ""}" data-action="close-modal">
      <section class="modal ${large ? "large" : ""} ${drawer ? "drawer" : ""} ${className}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <div class="modal-head">
          <h2>${escapeHtml(title)}</h2>
          <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-foot">${actions}</div>
      </section>
    </div>
  `;
}

function closeModal() {
  if (state.modalContext === "company-store-picker") state.companyStoreSelectedIds.clear();
  modalRoot.innerHTML = "";
  state.modalContext = null;
  state.companyDraft = null;
  state.companyErrors = {};
  state.companyInvoiceOpenStep = 1;
  state.companyInvoiceProductSelected = true;
  state.companyInvoiceOpenError = "";
  state.companyInvoiceMissingLicenses = [];
  state.companyStoreRemovingId = "";
  state.customerDraft = null;
  state.customerErrors = {};
  state.storeDraft = null;
  state.brandLogoSchemeDraft = null;
  state.brandLogoSchemeFileError = "";
}

function render() {
  if (state.view === "customer-list") renderCustomerList();
  if (state.view === "customer-detail") renderCustomerDetail();
  if (state.view === "company-detail") renderCompanyDetail();
  if (state.view === "brand-detail") renderBrandDetail();
  if (state.view === "einvoice-settings") renderEinvoiceSettings();
  requestAnimationFrame(() => app.focus({ preventScroll: true }));
}

function renderCustomerList() {
  const nameKeyword = state.customerNameKeyword.toLowerCase();
  const shortNameKeyword = state.customerShortNameKeyword.toLowerCase();
  const idKeyword = state.customerIdKeyword.toLowerCase();
  const filtered = state.customers.filter((customer) => {
    const matchName = !nameKeyword || customer.name.toLowerCase().includes(nameKeyword);
    const matchShortName = !shortNameKeyword || customer.shortName.toLowerCase().includes(shortNameKeyword);
    const matchId = !idKeyword || customer.id.toLowerCase().includes(idKeyword);
    const matchSales = !state.customerSalesKeyword || customer.salesName === state.customerSalesKeyword;
    const matchType = !state.customerTypeKeyword || customer.customerType === state.customerTypeKeyword;
    return matchName && matchShortName && matchId && matchSales && matchType;
  });
  app.innerHTML = `
    <section class="legacy-customer-list">
      <div class="legacy-filter-panel">
        <div class="legacy-filter-grid">
          <input id="customerNameInput" value="${escapeHtml(state.customerNameKeyword)}" placeholder="客户名称" aria-label="客户名称" />
          <input id="customerShortNameInput" value="${escapeHtml(state.customerShortNameKeyword)}" placeholder="客户简称" aria-label="客户简称" />
          <input id="customerIdInput" value="${escapeHtml(state.customerIdKeyword)}" placeholder="客户编号" aria-label="客户编号" />
          <select id="customerSalesInput" aria-label="所属销售">
            <option value="">请输入销售名字</option>
            ${salesOptions.map((sales) => `<option value="${escapeHtml(sales.name)}" ${state.customerSalesKeyword === sales.name ? "selected" : ""}>${escapeHtml(sales.name)}</option>`).join("")}
          </select>
          <select id="customerTypeInput" aria-label="客户类型">
            <option value="">请选择客户类型</option>
            <option value="KA" ${state.customerTypeKeyword === "KA" ? "selected" : ""}>KA客户</option>
            <option value="ISV" ${state.customerTypeKeyword === "ISV" ? "selected" : ""}>ISV客户</option>
          </select>
        </div>
        <div class="legacy-query-actions">
          <button class="button" type="button" data-action="reset-customers">重置</button>
          <button class="button primary" type="button" data-action="search-customers">查询</button>
        </div>
      </div>
      <div class="legacy-list-actions">
        <button class="button primary" type="button" data-action="create-ka-customer">＋ 新增KA客户</button>
        <button class="button primary" type="button" data-action="create-isv-customer">＋ 新增ISV客户</button>
        <button class="legacy-settings-button" type="button" aria-label="列表设置">⚙</button>
      </div>
      <div class="legacy-table-panel">
      ${
        filtered.length
          ? `
            <div class="table-scroll">
              <table class="data-table legacy-customer-table">
                <thead><tr><th>创建时间</th><th>客户名称</th><th>客户简称</th><th>所属销售</th><th>客户类型</th><th>客户编号</th><th>操作</th></tr></thead>
                <tbody>
                  ${filtered
                    .map(
                      (customer) => `
                        <tr>
                          <td>${escapeHtml(customer.createdAt)}</td>
                          <td><strong>${escapeHtml(customer.name)}</strong></td>
                          <td>${escapeHtml(customer.shortName || "-")}</td>
                          <td>${escapeHtml(customer.salesName || "-")}</td>
                          <td>${escapeHtml(customerTypes[customer.customerType] || customer.customerType || "-")}</td>
                          <td>${escapeHtml(customer.id)}</td>
                          <td><button class="button link" type="button" data-action="open-customer" data-id="${customer.id}">详情</button></td>
                        </tr>
                      `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="pagination legacy-pagination">
              <span>第 1-${filtered.length} 条/总共 ${filtered.length} 条</span>
              <button class="button small" disabled>‹</button>
              <button class="button small primary">1</button>
              <button class="button small" disabled>›</button>
              <select aria-label="每页条数"><option>10 条/页</option></select>
            </div>
          `
          : emptyState("暂无符合条件的客户", "请调整筛选条件后重新查询")
      }
      </div>
    </section>
  `;
}

function renderCustomerDetail() {
  const customer = currentCustomer();
  app.innerHTML = `
    <div class="legacy-detail-breadcrumb"><button type="button" data-action="back-customer-list">客户列表</button><span>/</span><strong>客户详情</strong></div>
    <section class="panel legacy-customer-detail">
      <div class="tabs" role="tablist" aria-label="客户详情">
        ${customerTabButton("basic", "客户信息")}
        ${customerTabButton("companies", "公司列表")}
        ${customerTabButton("brands", "品牌列表")}
        ${customerTabButton("products", "产品功能")}
      </div>
      ${renderCustomerTab(customer)}
    </section>
  `;
}

function customerTabButton(tab, label) {
  return `<button class="tab-button ${state.customerTab === tab ? "active" : ""}" type="button" data-action="customer-tab" data-tab="${tab}">${label}</button>`;
}

function renderCustomerTab(customer) {
  if (state.customerTab === "basic") {
    return `
      <div class="tab-panel legacy-customer-info">
        <div class="legacy-section-head">
          <h2>基本信息</h2>
          <button class="button primary" type="button" data-action="edit-customer">编辑</button>
        </div>
        <dl class="legacy-info-grid">
          <div><dt>客户名称</dt><dd>${escapeHtml(customer.name)}</dd></div>
          <div><dt>客户简称</dt><dd>${escapeHtml(customer.shortName || "-")}</dd></div>
          <div><dt>所属行业</dt><dd>${escapeHtml(industryDisplay(customer))}</dd></div>
          <div><dt>客户标准logo</dt><dd>${escapeHtml(customer.standardLogo || "-")}</dd></div>
          <div><dt>客户横版logo</dt><dd>${escapeHtml(customer.horizontalLogo || "-")}</dd></div>
          <div><dt>项目编号</dt><dd>${escapeHtml(customer.projectNo)}</dd></div>
          <div><dt>客户类型</dt><dd>${escapeHtml(customerTypes[customer.customerType] || "-")}</dd></div>
        </dl>
        <div class="legacy-section-head"><h2>联系人信息</h2></div>
        <dl class="legacy-info-grid">
          <div><dt>联系人姓名</dt><dd>${escapeHtml(customer.contactName || "-")}</dd></div>
          <div><dt>联系人电话</dt><dd>${escapeHtml(customer.contactPhone || "-")}</dd></div>
          <div><dt>联系人邮箱</dt><dd>${escapeHtml(customer.contactEmail || "-")}</dd></div>
        </dl>
        <div class="legacy-section-head"><h2>销售信息</h2></div>
        <dl class="legacy-info-grid">
          <div><dt>所属销售</dt><dd>${escapeHtml(customer.salesName || "-")}</dd></div>
          <div><dt>所属组织</dt><dd>${escapeHtml(customer.salesOrg || "-")}</dd></div>
          <div><dt>客户执行</dt><dd>${escapeHtml(customer.customerExecutive || "-")}</dd></div>
        </dl>
        <div class="legacy-section-head legacy-admin-head">
          <h2>未设置超级管理员</h2>
          <button class="button primary" type="button">立即添加</button>
        </div>
      </div>
    `;
  }
  if (state.customerTab === "companies") return renderCompanyList(customer);
  if (state.customerTab === "brands") return renderBrandList(customer);
  return renderProductFeature(customer);
}

function companyPrimaryRegistration(company) {
  return company.country === "MY"
    ? { label: "商业注册号码（BRN）", value: company.licenses.BRN || "" }
    : { label: "统一社会信用代码", value: company.licenses.USCC || "" };
}

function renderCompanyCollection(customer, options) {
  const {
    sourceCompanies,
    countryKeyword,
    nameKeyword,
    registrationKeyword,
    typeKeyword,
    invoiceStatusKeyword,
    inputPrefix,
    searchAction,
    resetAction,
    showCreateAction = false,
    showInvoiceOpenAction = true,
  } = options;
  const normalizedNameKeyword = nameKeyword.toLowerCase();
  const normalizedRegistrationKeyword = registrationKeyword.toLowerCase();
  const companies = sourceCompanies.filter((company) => {
    const matchesCountry = !countryKeyword || company.country === countryKeyword;
    const matchesName = !normalizedNameKeyword || company.legalName.toLowerCase().includes(normalizedNameKeyword);
    const primaryRegistration = companyPrimaryRegistration(company).value;
    const matchesRegistration =
      !normalizedRegistrationKeyword || primaryRegistration.toLowerCase().includes(normalizedRegistrationKeyword);
    const matchesType = !typeKeyword || (company.type || "Head") === typeKeyword;
    const matchesInvoiceStatus = !invoiceStatusKeyword || company.invoiceStatus === invoiceStatusKeyword;
    return matchesCountry && matchesName && matchesRegistration && matchesType && matchesInvoiceStatus;
  });
  const inputId = (name) => `${inputPrefix}${name}`;
  return `
    <div class="tab-panel">
      <div class="toolbar">
        <div class="filter-fields company-filter-fields">
          <label class="field"><span>公司名称</span><input id="${inputId("NameInput")}" value="${escapeHtml(nameKeyword)}" placeholder="请输入公司名称" /></label>
          <label class="field"><span>国家/地区</span>
            <select id="${inputId("CountryFilterInput")}">
              <option value="">全部</option>
              <option value="CN" ${countryKeyword === "CN" ? "selected" : ""}>中国</option>
              <option value="MY" ${countryKeyword === "MY" ? "selected" : ""}>马来西亚</option>
            </select>
          </label>
          <label class="field"><span>注册证照号码</span><input id="${inputId("RegistrationInput")}" value="${escapeHtml(registrationKeyword)}" placeholder="请输入统一社会信用代码或 BRN" /></label>
          <label class="field"><span>公司类型</span>
            <select id="${inputId("TypeInput")}">
              <option value="">全部</option>
              <option value="Head" ${typeKeyword === "Head" ? "selected" : ""}>总公司</option>
              <option value="Branch" ${typeKeyword === "Branch" ? "selected" : ""}>分公司</option>
            </select>
          </label>
          <label class="field"><span>发票功能状态</span>
            <select id="${inputId("InvoiceStatusInput")}">
              <option value="">全部</option>
              <option value="unopened" ${invoiceStatusKeyword === "unopened" ? "selected" : ""}>未开通</option>
              <option value="opened" ${invoiceStatusKeyword === "opened" ? "selected" : ""}>已开通</option>
              <option value="opening" ${invoiceStatusKeyword === "opening" ? "selected" : ""}>开通中</option>
              <option value="failed" ${invoiceStatusKeyword === "failed" ? "selected" : ""}>开通失败</option>
            </select>
          </label>
          <div class="inline-actions">
            <button class="button primary" type="button" data-action="${searchAction}">查询</button>
            <button class="button" type="button" data-action="${resetAction}">重置</button>
          </div>
        </div>
        ${
          showCreateAction
            ? '<div class="toolbar-actions"><button class="button primary" type="button" data-action="create-company">创建公司</button></div>'
            : ""
        }
      </div>
      <div class="table-scroll">
        <table class="data-table company-list-table">
          <thead>
            <tr><th>公司名称</th><th>国家/地区</th><th>公司类型</th><th>上级公司</th><th>注册证照号码</th><th>发票功能状态</th><th>操作</th></tr>
          </thead>
          <tbody>
            ${companies
              .map((company) => {
                const primaryRegistration = companyPrimaryRegistration(company);
                return `
                  <tr>
                    <td><strong>${escapeHtml(company.legalName)}</strong></td>
                    <td>${escapeHtml(countries[company.country] || "-")}</td>
                    <td>${companyTypes[company.type || "Head"]}</td>
                    <td>${escapeHtml(parentCompanyName(customer, company))}</td>
                    <td>${escapeHtml(primaryRegistration.value || "-")}</td>
                    <td>${statusTag(company.invoiceStatus)}</td>
                    <td class="actions">
                      <button class="button link" type="button" data-action="open-company-detail" data-id="${company.id}">详情</button>
                      ${
                        showInvoiceOpenAction && company.country === "MY"
                          ? `<button class="button link" type="button" data-action="open-company-invoice-from-list" data-id="${company.id}">开通</button>`
                          : ""
                      }
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${companies.length} 条</span></div>
    </div>
  `;
}

function renderCompanyList(customer) {
  return renderCompanyCollection(customer, {
    sourceCompanies: customer.companies,
    countryKeyword: state.companyCountryKeyword,
    nameKeyword: state.companyNameKeyword,
    registrationKeyword: state.companyRegistrationKeyword,
    typeKeyword: state.companyTypeKeyword,
    invoiceStatusKeyword: state.companyInvoiceStatusKeyword,
    inputPrefix: "company",
    searchAction: "search-companies",
    resetAction: "reset-companies",
    showCreateAction: true,
  });
}

function renderBrandList(customer) {
  const nameKeyword = state.brandNameKeyword.toLowerCase();
  const idKeyword = state.brandIdKeyword.toLowerCase();
  const brands = customer.brands.filter((brand) => {
    const matchesName = !nameKeyword || brand.name.toLowerCase().includes(nameKeyword);
    const matchesId = !idKeyword || brand.id.toLowerCase().includes(idKeyword);
    return matchesName && matchesId;
  });
  return `
    <div class="tab-panel">
      <div class="toolbar">
        <div class="filter-fields">
          <label class="field"><span>品牌名称</span><input id="brandNameInput" value="${escapeHtml(state.brandNameKeyword)}" placeholder="请输入品牌名称" /></label>
          <label class="field"><span>品牌编号</span><input id="brandIdInput" value="${escapeHtml(state.brandIdKeyword)}" placeholder="请输入品牌编号" /></label>
          <div class="inline-actions">
            <button class="button primary" type="button" data-action="search-brands">查询</button>
            <button class="button" type="button" data-action="reset-brands">重置</button>
          </div>
        </div>
        <div class="toolbar-actions"><button class="button primary" type="button" data-action="create-brand">创建品牌</button></div>
      </div>
      ${
        brands.length
          ? `
            <div class="table-scroll">
              <table class="data-table brand-list-table">
                <thead><tr><th>品牌名称</th><th>品牌编号</th><th>经营国家/地区</th><th>创建时间</th><th>操作</th></tr></thead>
                <tbody>
                  ${brands
                    .map(
                      (brand) => `
                        <tr>
                          <td><strong>${escapeHtml(brand.name)}</strong></td>
                          <td>${escapeHtml(brand.id)}</td>
                          <td>${escapeHtml(countries[brand.country] || "-")}</td>
                          <td>${escapeHtml(brand.createdAt)}</td>
                          <td><button class="button link" type="button" data-action="open-brand-detail" data-id="${brand.id}">详情</button></td>
                        </tr>
                      `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="pagination"><span>共 ${brands.length} 条</span></div>
          `
          : emptyState("暂无品牌", "创建品牌后可继续维护 Logo 和门店")
      }
    </div>
  `;
}

function renderProductFeature(customer) {
  return `
    <div class="tab-panel">
      <div class="product-grid single">
        <article class="product-card">
          <div class="product-card-head">
            <h3>电子发票</h3>
            <span class="tag ${customer.productOpen ? "success" : ""}">${customer.productOpen ? "已开通" : "未开通"}</span>
          </div>
          <div class="product-card-body">
            <p>聚合不同开票服务商能力，覆盖线上线下、多端场景。</p>
            ${
              customer.productOpen
                ? `<button class="button primary" type="button" data-action="open-einvoice-settings">设置</button>`
                : `<button class="button primary" type="button" data-action="confirm-product-open">开通</button>`
            }
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderCompanyDetail() {
  const customer = currentCustomer();
  const company = currentCompany();
  if (!company) {
    state.view = "customer-detail";
    render();
    return;
  }
  if ((company.type || "Head") !== "Head" && state.companyTab === "branches") state.companyTab = "master";
  app.innerHTML = `
    <div class="legacy-detail-breadcrumb">
      <button type="button" data-action="back-customer-list">客户列表</button>
      <span>/</span>
      <button type="button" data-action="back-customer-detail" data-tab="companies">客户详情</button>
      <span>/</span>
      <strong>公司详情</strong>
    </div>
    <section class="panel legacy-customer-detail">
      <div class="tabs" role="tablist" aria-label="公司详情">
        ${companyTabButton("master", "公司信息")}
        ${companyTabButton("stores", "门店管理")}
        ${(company.type || "Head") === "Head" ? companyTabButton("branches", "分公司管理") : ""}
        ${companyTabButton("function", "功能状态")}
      </div>
      ${renderCompanyTab(customer, company)}
    </section>
  `;
}

function companyTabButton(tab, label) {
  return `<button class="tab-button ${state.companyTab === tab ? "active" : ""}" type="button" data-action="company-tab" data-tab="${tab}">${label}</button>`;
}

function renderCompanyTab(customer, company) {
  if (state.companyTab === "master") {
    if (company.country === "CN") {
      return `
        <div class="tab-panel legacy-customer-info">
          <div class="legacy-section-head">
            <h2>基本信息</h2>
            <button class="button primary" type="button" data-action="edit-company" data-id="${company.id}">编辑</button>
          </div>
          <dl class="legacy-info-grid">
            <div><dt>公司名称</dt><dd>${escapeHtml(company.legalName)}</dd></div>
            <div><dt>统一社会信用代码</dt><dd>${escapeHtml(company.licenses.USCC || "-")}</dd></div>
            <div><dt>公司类型</dt><dd>${companyTypes[company.type || "Head"]}</dd></div>
            <div><dt>上级公司</dt><dd>${escapeHtml(parentCompanyName(customer, company))}</dd></div>
            <div><dt>所属行业</dt><dd>${escapeHtml(industryDisplay(company))}</dd></div>
            <div><dt>公司编号</dt><dd>${escapeHtml(company.id)}</dd></div>
            <div><dt>备注</dt><dd>${escapeHtml(company.remark || "-")}</dd></div>
          </dl>
        </div>
      `;
    }
    return `
      <div class="tab-panel legacy-customer-info">
        <div class="legacy-section-head">
          <h2>基本信息</h2>
          <button class="button primary" type="button" data-action="edit-company" data-id="${company.id}">编辑</button>
        </div>
        <dl class="legacy-info-grid">
          <div><dt>公司名称</dt><dd>${escapeHtml(company.legalName)}</dd></div>
          <div><dt>商业注册号码（BRN）</dt><dd>${escapeHtml(company.licenses.BRN || "-")}</dd></div>
          <div><dt>税务识别号码（TIN）</dt><dd>${escapeHtml(company.licenses.TIN || "-")}</dd></div>
          <div><dt>销售与服务税注册号码（SST）</dt><dd>${escapeHtml(company.licenses.SST || "-")}</dd></div>
          <div><dt>公司类型</dt><dd>${companyTypes[company.type || "Head"]}</dd></div>
          <div><dt>上级公司</dt><dd>${escapeHtml(parentCompanyName(customer, company))}</dd></div>
          <div><dt>注册地址</dt><dd>${escapeHtml(company.address || "-")}</dd></div>
          <div><dt>联系电话</dt><dd>${escapeHtml(company.phone)}</dd></div>
          <div><dt>联系邮箱</dt><dd>${escapeHtml(company.email || "-")}</dd></div>
          <div><dt>所属行业</dt><dd>${escapeHtml(industryDisplay(company))}</dd></div>
          <div><dt>经营业务说明</dt><dd>${escapeHtml(company.businessDesc)}</dd></div>
        </dl>
      </div>
    `;
  }
  if (state.companyTab === "stores") {
    return renderCompanyStoreManagement(customer, company);
  }
  if (state.companyTab === "branches") return renderCompanyBranches(customer, company);
  return renderCompanyFunction(customer, company);
}

function customerStoreRecords(customer = currentCustomer()) {
  return customer.brands.flatMap((brand) => brand.stores.map((store) => ({ brand, store })));
}

function companyStoreMatches(record, filters) {
  const storeName = record.store.name.toLowerCase();
  return (
    (!filters.brand || record.brand.id === filters.brand) &&
    (!filters.name || storeName.includes(filters.name.toLowerCase())) &&
    (!filters.storeNo || record.store.storeNo.toLowerCase() === filters.storeNo.toLowerCase()) &&
    (!filters.storeId || record.store.id === filters.storeId)
  );
}

function currentCompanyStoreFilters() {
  return {
    brand: state.companyStoreBrandKeyword,
    name: state.companyStoreNameKeyword,
    storeNo: state.companyStoreNoKeyword,
    storeId: state.companyStoreIdKeyword,
  };
}

function renderCompanyStoreManagement(customer, company) {
  const eligibleBrands = customer.brands.filter((brand) => brand.country === company.country);
  const stores = customerStoreRecords(customer).filter(
    (record) => record.store.companyId === company.id && companyStoreMatches(record, currentCompanyStoreFilters()),
  );
  return `
    <div class="tab-panel company-store-management">
      <div class="toolbar company-store-toolbar">
        <div class="filter-fields company-store-filter-fields">
          <label class="field"><span>所属品牌</span>
            <select id="companyStoreBrandFilter">
              <option value="">全部品牌</option>
              ${eligibleBrands.map((brand) => `<option value="${brand.id}" ${state.companyStoreBrandKeyword === brand.id ? "selected" : ""}>${escapeHtml(brand.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field"><span>门店名</span><input id="companyStoreNameFilter" value="${escapeHtml(state.companyStoreNameKeyword)}" placeholder="请输入门店名" /></label>
          <label class="field"><span>门店号</span><input id="companyStoreNoFilter" value="${escapeHtml(state.companyStoreNoKeyword)}" placeholder="请输入门店号" /></label>
          <label class="field"><span>门店 ID</span><input id="companyStoreIdFilter" value="${escapeHtml(state.companyStoreIdKeyword)}" placeholder="请输入门店 ID" /></label>
          <div class="inline-actions">
            <button class="button primary" type="button" data-action="search-company-stores">查询</button>
            <button class="button" type="button" data-action="reset-company-stores">重置</button>
          </div>
        </div>
        <div class="toolbar-actions"><button class="button primary" type="button" data-action="open-company-store-picker">添加管理门店</button></div>
      </div>
      <div class="table-scroll">
        <table class="data-table company-store-table">
          <thead><tr><th>门店名</th><th>门店号</th><th>门店 ID</th><th>所属品牌</th><th>操作</th></tr></thead>
          <tbody>
            ${
              stores.length
                ? stores
                    .map(
                      ({ brand, store }) => `
                        <tr>
                          <td>${escapeHtml(store.name)}</td>
                          <td>${escapeHtml(store.storeNo)}</td>
                          <td>${escapeHtml(store.id)}</td>
                          <td>${escapeHtml(brand.name)}</td>
                          <td><button class="button link danger-text" type="button" data-action="request-remove-company-store" data-id="${store.id}">移除</button></td>
                        </tr>
                      `,
                    )
                    .join("")
                : '<tr><td colspan="5" class="table-empty-cell">暂无匹配的已关联门店</td></tr>'
            }
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${stores.length} 条</span></div>
    </div>
  `;
}

function readCompanyStorePickerFilters() {
  state.companyStorePickerBrandKeyword = document.getElementById("storePickerBrandFilter")?.value || "";
  state.companyStorePickerNameKeyword = document.getElementById("storePickerNameFilter")?.value.trim() || "";
  state.companyStorePickerNoKeyword = document.getElementById("storePickerNoFilter")?.value.trim() || "";
  state.companyStorePickerIdKeyword = document.getElementById("storePickerIdFilter")?.value.trim() || "";
}

function companyStorePickerFilters() {
  return {
    brand: state.companyStorePickerBrandKeyword,
    name: state.companyStorePickerNameKeyword,
    storeNo: state.companyStorePickerNoKeyword,
    storeId: state.companyStorePickerIdKeyword,
  };
}

function renderCompanyStorePicker() {
  const customer = currentCustomer();
  const company = currentCompany();
  if (!company) return;
  const eligibleBrands = customer.brands.filter((brand) => brand.country === company.country);
  const sameCountryRecords = customerStoreRecords(customer).filter((record) => record.brand.country === company.country);
  const records = sameCountryRecords.filter(
    (record) =>
      companyStoreMatches(record, companyStorePickerFilters()) &&
      (!state.companyStorePickerOnlyAvailable || !record.store.companyId),
  );
  const selectableRecords = records.filter((record) => !record.store.companyId);
  const validSelectableIds = new Set(sameCountryRecords.filter((record) => !record.store.companyId).map((record) => record.store.id));
  [...state.companyStoreSelectedIds].forEach((id) => {
    if (!validSelectableIds.has(id)) state.companyStoreSelectedIds.delete(id);
  });
  const allVisibleSelected =
    selectableRecords.length > 0 && selectableRecords.every((record) => state.companyStoreSelectedIds.has(record.store.id));
  const someVisibleSelected = selectableRecords.some((record) => state.companyStoreSelectedIds.has(record.store.id));
  state.modalContext = "company-store-picker";
  openModal({
    title: "添加管理门店",
    large: true,
    className: "company-store-picker-modal",
    body: `
      <p class="modal-description">从当前客户下与公司同国家/地区的品牌门店中选择，可多选。</p>
      <div class="company-store-country-rule">
        <span>当前公司国家/地区</span>
        <strong>${escapeHtml(countries[company.country])}</strong>
        <em>仅展示同国家/地区品牌下的门店</em>
      </div>
      <div class="filter-fields company-store-picker-filters">
        <label class="field"><span>所属品牌</span>
          <select id="storePickerBrandFilter">
            <option value="">全部品牌</option>
            ${eligibleBrands.map((brand) => `<option value="${brand.id}" ${state.companyStorePickerBrandKeyword === brand.id ? "selected" : ""}>${escapeHtml(brand.name)}</option>`).join("")}
          </select>
        </label>
        <label class="field"><span>门店名</span><input id="storePickerNameFilter" value="${escapeHtml(state.companyStorePickerNameKeyword)}" placeholder="请输入门店名" /></label>
        <label class="field"><span>门店号</span><input id="storePickerNoFilter" value="${escapeHtml(state.companyStorePickerNoKeyword)}" placeholder="请输入门店号" /></label>
        <label class="field"><span>门店 ID</span><input id="storePickerIdFilter" value="${escapeHtml(state.companyStorePickerIdKeyword)}" placeholder="请输入门店 ID" /></label>
        <div class="inline-actions">
          <button class="button primary" type="button" data-action="search-company-store-picker">查询</button>
          <button class="button" type="button" data-action="reset-company-store-picker">重置</button>
        </div>
      </div>
      <div class="company-store-selection-bar">
        <strong>已选 <span>${state.companyStoreSelectedIds.size}</span> 项</strong>
        <label><input id="companyStorePickerOnlyAvailable" type="checkbox" ${state.companyStorePickerOnlyAvailable ? "checked" : ""} />只看可关联门店</label>
        <span>已关联其他公司的门店不可选择</span>
      </div>
      <div class="table-scroll company-store-picker-table-wrap">
        <table class="data-table company-store-picker-table">
          <thead><tr><th class="checkbox-column"><input id="companyStorePickerSelectAll" type="checkbox" ${allVisibleSelected ? "checked" : ""} ${selectableRecords.length ? "" : "disabled"} data-indeterminate="${someVisibleSelected && !allVisibleSelected}" aria-label="全选当前可关联门店" /></th><th>门店名</th><th>门店号</th><th>门店 ID</th><th>所属品牌</th><th>说明</th></tr></thead>
          <tbody>
            ${
              records.length
                ? records
                    .map(({ brand, store }) => {
                      const linkedCurrent = store.companyId === company.id;
                      const linkedOther = Boolean(store.companyId && !linkedCurrent);
                      const disabled = linkedCurrent || linkedOther;
                      const explanation = linkedCurrent
                        ? "已关联当前公司"
                        : linkedOther
                          ? `不可添加，已关联到【${companyName(customer, store.companyId)}】`
                          : "-";
                      return `
                        <tr class="${disabled ? "disabled-row" : ""}">
                          <td class="checkbox-column"><input type="checkbox" data-action="select-company-store" data-id="${store.id}" ${state.companyStoreSelectedIds.has(store.id) ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="选择${escapeHtml(store.name)}" /></td>
                          <td>${escapeHtml(store.name)}</td>
                          <td>${escapeHtml(store.storeNo)}</td>
                          <td>${escapeHtml(store.id)}</td>
                          <td>${escapeHtml(brand.name)}</td>
                          <td class="${linkedOther ? "danger-text" : "muted"}">${escapeHtml(explanation)}</td>
                        </tr>
                      `;
                    })
                    .join("")
                : '<tr><td colspan="6" class="table-empty-cell">暂无符合条件的同国家/地区品牌门店</td></tr>'
            }
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${records.length} 条</span></div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="confirm-company-store-picker" ${state.companyStoreSelectedIds.size ? "" : "disabled"}>确认选择</button>`,
  });
  const selectAll = document.getElementById("companyStorePickerSelectAll");
  if (selectAll) selectAll.indeterminate = someVisibleSelected && !allVisibleSelected;
}

function openCompanyStorePicker() {
  state.companyStorePickerBrandKeyword = "";
  state.companyStorePickerNameKeyword = "";
  state.companyStorePickerNoKeyword = "";
  state.companyStorePickerIdKeyword = "";
  state.companyStorePickerOnlyAvailable = false;
  state.companyStoreSelectedIds.clear();
  renderCompanyStorePicker();
}

function confirmCompanyStorePicker() {
  const company = currentCompany();
  if (!company || !state.companyStoreSelectedIds.size) return;
  let count = 0;
  customerStoreRecords().forEach(({ brand, store }) => {
    if (
      state.companyStoreSelectedIds.has(store.id) &&
      brand.country === company.country &&
      !store.companyId
    ) {
      store.companyId = company.id;
      store.associationStatus = "associated";
      count += 1;
    }
  });
  closeModal();
  render();
  showToast(`已添加 ${count} 家管理门店`);
}

function openRemoveCompanyStoreConfirm(storeId) {
  const company = currentCompany();
  const record = customerStoreRecords().find(({ store }) => store.id === storeId && store.companyId === company?.id);
  if (!record) return;
  state.companyStoreRemovingId = storeId;
  state.modalContext = "company-store-remove";
  openModal({
    title: "移除管理门店",
    body: `<div class="notice warning"><span>确定将“${escapeHtml(record.store.name)}”从当前公司的管理门店中移除吗？移除后，该门店将不再通过当前公司作为开票主体。</span></div>`,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button danger" type="button" data-action="confirm-remove-company-store">确定移除</button>`,
  });
}

function confirmRemoveCompanyStore() {
  const company = currentCompany();
  const record = customerStoreRecords().find(
    ({ store }) => store.id === state.companyStoreRemovingId && store.companyId === company?.id,
  );
  if (!record) return;
  record.store.companyId = "";
  record.store.associationStatus = "unassociated";
  record.store.invoiceEnabled = false;
  closeModal();
  render();
  showToast("门店关联已解除");
}

function renderCompanyBranches(customer, company) {
  const directBranches = customer.companies.filter((item) => {
    return (item.type || "Head") === "Branch" && item.parentCompanyId === company.id;
  });
  return renderCompanyCollection(customer, {
    sourceCompanies: directBranches,
    countryKeyword: state.companyBranchCountryKeyword,
    nameKeyword: state.companyBranchNameKeyword,
    registrationKeyword: state.companyBranchRegistrationKeyword,
    typeKeyword: state.companyBranchTypeKeyword,
    invoiceStatusKeyword: state.companyBranchInvoiceStatusKeyword,
    inputPrefix: "companyBranch",
    searchAction: "search-company-branches",
    resetAction: "reset-company-branches",
    showInvoiceOpenAction: false,
  });
}

function renderCompanyFunction(customer, company) {
  const status = invoiceStatuses[company.invoiceStatus] || invoiceStatuses.unopened;
  if (state.companyFunctionView === "list") {
    const chinaDescriptions = {
      unopened: "尚未开通发票功能",
      opening: "发票功能正在开通中",
      opened: "发票功能已开通",
      failed: "发票功能开通失败",
    };
    const malaysiaDescription = company.invoiceStatus === "opened" ? "发票功能已开通" : "尚未开通发票功能";
    return `
      <div class="tab-panel company-function-list">
        <div class="section-heading"><h2>功能列表</h2></div>
        <button class="company-function-card" type="button" data-action="open-company-invoice-feature">
          <span class="company-function-icon"><img src="./assets/receipt-text.svg" alt="" /></span>
          <span class="company-function-copy"><strong>发票</strong><small>${company.country === "CN" ? chinaDescriptions[company.invoiceStatus] || chinaDescriptions.unopened : malaysiaDescription}</small></span>
          <span class="tag ${status.className}">${status.label}</span>
          <img class="company-function-arrow" src="./assets/chevron-right.svg" alt="" />
        </button>
      </div>
    `;
  }
  const chinaReadonly = company.country === "CN";
  let action = "";
  let notice = chinaReadonly
    ? `<div class="notice"><span>中国公司的发票功能由销售人员在 CRM 发起开通，运营管理平台仅展示状态。</span></div>`
    : "";

  if (!chinaReadonly && company.invoiceStatus === "opened") {
    notice = `<div class="notice"><span>该公司电子发票功能已开通，纳税人主体已建立。</span></div>`;
  } else if (!chinaReadonly && !customer.productOpen) {
    notice = `<div class="notice warning"><span>请先为客户开通电子发票产品，再为具体公司开通发票功能。</span><button class="button link" type="button" data-action="go-product-feature">前往产品功能</button></div>`;
  } else if (!chinaReadonly) {
    action = `<button class="button primary" type="button" data-action="open-company-invoice">开通电子发票</button>`;
  }

  return `
    <div class="tab-panel">
      <button class="button link function-back" type="button" data-action="back-company-function-list">返回功能列表</button>
      ${notice}
      <div class="panel-head" style="padding:0 0 18px">
        <div><h2>发票</h2><p>公司级发票功能与纳税人主体状态。</p></div>
        ${action}
      </div>
      <dl class="info-grid">
        <div><dt>功能状态</dt><dd><span class="tag ${status.className}">${status.label}</span></dd></div>
        <div><dt>纳税人主体</dt><dd>${company.taxpayerExists ? "已建立" : "未建立"}</dd></div>
        <div><dt>纳税人唯一身份</dt><dd>${company.taxpayerExists ? escapeHtml(company.licenses.TIN || company.licenses.USCC) : "-"}</dd></div>
        <div><dt>开通时间</dt><dd>${escapeHtml(company.openedAt || "-")}</dd></div>
      </dl>
    </div>
  `;
}

function renderBrandDetail() {
  const customer = currentCustomer();
  const brand = currentBrand();
  if (!brand) {
    state.view = "customer-detail";
    state.customerTab = "brands";
    render();
    return;
  }
  app.innerHTML = `
    <div class="legacy-detail-breadcrumb">
      <button type="button" data-action="back-customer-list">客户列表</button>
      <span>/</span>
      <button type="button" data-action="back-customer-detail" data-tab="brands">客户详情</button>
      <span>/</span>
      <strong>品牌详情</strong>
    </div>
    <section class="panel legacy-customer-detail brand-detail-panel">
      <div class="tabs" role="tablist" aria-label="品牌详情">
        ${brandTabButton("info", "品牌信息")}
        ${brandTabButton("logo", "Logo 管理")}
        ${brandTabButton("products", "产品管理")}
        ${brandTabButton("merchants", "商户信息")}
        ${brandTabButton("stores", "门店管理")}
        ${brandTabButton("cashier", "收银台")}
        ${brandTabButton("store-groups", "门店组管理")}
      </div>
      ${renderBrandTab(customer, brand)}
    </section>
  `;
}

function brandTabButton(tab, label) {
  return `<button class="tab-button ${state.brandTab === tab ? "active" : ""}" type="button" data-action="brand-tab" data-tab="${tab}">${label}</button>`;
}

function renderBrandTab(customer, brand) {
  if (state.brandTab === "info") {
    return `
      <div class="tab-panel legacy-customer-info brand-master-info">
        <div class="legacy-section-head">
          <h2>品牌基本信息</h2>
          <button class="button primary" type="button" data-action="edit-brand" data-id="${brand.id}">编辑</button>
        </div>
        <dl class="legacy-info-grid">
          <div><dt>品牌名称</dt><dd>${escapeHtml(brand.name)}</dd></div>
          <div><dt>品牌描述</dt><dd>${escapeHtml(brand.description)}</dd></div>
          <div><dt>所属行业</dt><dd>${escapeHtml(industryDisplay(brand))}</dd></div>
          <div><dt>经营国家/地区</dt><dd>${escapeHtml(countries[brand.country] || "-")}</dd></div>
          <div><dt>创建时间</dt><dd>${escapeHtml(brand.createdAt || "-")}</dd></div>
        </dl>
        <div class="legacy-section-head"><h2>客户信息</h2></div>
        <dl class="legacy-info-grid">
          <div><dt>客户名称</dt><dd>${escapeHtml(customer.name)}</dd></div>
          <div><dt>客户简称</dt><dd>${escapeHtml(customer.shortName || "-")}</dd></div>
          <div><dt>所属行业</dt><dd>${escapeHtml(industryDisplay(customer))}</dd></div>
        </dl>
        <div class="legacy-section-head legacy-admin-head"><h2>未设置超级管理员</h2></div>
      </div>
    `;
  }
  if (state.brandTab === "logo") {
    const logoSets = ensureBrandLogoSets(brand);
    return `
      <div class="tab-panel brand-logo-management">
        <div class="brand-logo-scheme-toolbar">
          <div>
            <h2>Logo 方案</h2>
            <p>每组方案包含品牌标准 Logo 和品牌横版 Logo，最多可设置 ${BRAND_LOGO_SET_LIMIT} 组。</p>
          </div>
          <div class="brand-logo-scheme-toolbar-actions">
            <span>已设置 ${logoSets.length} / ${BRAND_LOGO_SET_LIMIT} 组</span>
            <button
              class="button primary"
              type="button"
              data-action="add-brand-logo-scheme"
              ${logoSets.length >= BRAND_LOGO_SET_LIMIT ? "disabled" : ""}
            >添加 Logo 方案</button>
          </div>
        </div>
        <div class="brand-logo-scheme-list">
          ${logoSets.map((scheme) => renderBrandLogoSchemeCard(brand, scheme)).join("")}
        </div>
      </div>
    `;
  }
  if (state.brandTab !== "stores") {
    return `<div class="tab-panel brand-empty-tab" aria-label="${escapeHtml(state.brandTab)}"></div>`;
  }
  return renderBrandStoreManagement(brand);
}

function ensureBrandLogoSets(brand) {
  if (!Array.isArray(brand.logoSets) || !brand.logoSets.length) {
    brand.logoSets = [
      {
        id: `${brand.id}-logo-default`,
        name: "默认版本",
        standardLogo: brand.standardLogo || "",
        horizontalLogo: brand.horizontalLogo || "",
        isDefault: true,
        createdAt: brand.createdAt || nowText(),
      },
    ];
  }
  if (!brand.logoSets.some((scheme) => scheme.isDefault)) brand.logoSets[0].isDefault = true;
  return brand.logoSets;
}

function brandLogoPreviewText(brand, scheme, horizontal = false) {
  if (scheme.isDefault) return horizontal ? brand.logoHorizontalText : brand.logoText;
  return horizontal ? scheme.name.toUpperCase() : scheme.name.slice(0, 2).toUpperCase();
}

function renderBrandLogoSchemeCard(brand, scheme) {
  return `
    <article class="brand-logo-scheme-card">
      <div class="brand-logo-scheme-head">
        <div class="brand-logo-scheme-title">
          <h3>${escapeHtml(scheme.name)}</h3>
          ${scheme.isDefault ? '<span class="tag success">默认</span>' : ""}
        </div>
        <div class="brand-logo-scheme-actions">
          <button class="button link" type="button" data-action="edit-brand-logo-scheme" data-id="${scheme.id}">编辑</button>
          ${
            scheme.isDefault
              ? ""
              : `<button class="button link danger-link" type="button" data-action="delete-brand-logo-scheme" data-id="${scheme.id}">删除</button>`
          }
        </div>
      </div>
      <div class="brand-logo-scheme-assets">
        <div class="brand-logo-scheme-asset">
          <span>品牌标准 Logo</span>
          <div class="logo-preview"><span class="demo-logo">${escapeHtml(brandLogoPreviewText(brand, scheme))}</span></div>
          <p class="logo-file-name">${escapeHtml(scheme.standardLogo || "-")}</p>
        </div>
        <div class="brand-logo-scheme-asset">
          <span>品牌横版 Logo</span>
          <div class="logo-preview"><span class="demo-logo horizontal">${escapeHtml(brandLogoPreviewText(brand, scheme, true))}</span></div>
          <p class="logo-file-name">${escapeHtml(scheme.horizontalLogo || "-")}</p>
        </div>
      </div>
    </article>
  `;
}

function filteredBrandStores(brand) {
  const idKeyword = state.brandStoreIdKeyword.toLowerCase();
  const nameKeyword = state.brandStoreNameKeyword.toLowerCase();
  const storeNoKeyword = state.brandStoreNoKeyword.toLowerCase();
  return brand.stores.filter((store) => {
    const matchesId = !idKeyword || store.id.toLowerCase() === idKeyword;
    const matchesName = !nameKeyword || store.name.toLowerCase().includes(nameKeyword);
    const matchesStoreNo = !storeNoKeyword || store.storeNo.toLowerCase() === storeNoKeyword;
    return matchesId && matchesName && matchesStoreNo;
  });
}

function renderBrandStoreManagement(brand) {
  const stores = filteredBrandStores(brand);
  return `
    <div class="tab-panel brand-store-management">
      <div class="toolbar brand-store-toolbar">
        <div class="filter-fields brand-store-filter-fields">
          <label class="field"><span>门店 ID</span><input id="brandStoreIdInput" value="${escapeHtml(state.brandStoreIdKeyword)}" placeholder="请输入门店 ID" /></label>
          <label class="field"><span>门店名称</span><input id="brandStoreNameInput" value="${escapeHtml(state.brandStoreNameKeyword)}" placeholder="请输入门店名称" /></label>
          <label class="field"><span>门店号</span><input id="brandStoreNoInput" value="${escapeHtml(state.brandStoreNoKeyword)}" placeholder="请输入门店号" /></label>
          <div class="inline-actions">
            <button class="button" type="button" data-action="reset-brand-stores">重置</button>
            <button class="button primary" type="button" data-action="search-brand-stores">查询</button>
          </div>
        </div>
      </div>
      <div class="brand-store-actions">
        ${
          brand.country === "CN"
            ? `<button class="button primary" type="button" data-action="import-brand-stores">导入门店</button>`
            : ""
        }
        <button class="button primary" type="button" data-action="create-store">创建门店</button>
      </div>
      <div class="table-scroll">
        <table class="data-table brand-store-table">
          <thead><tr><th>创建时间</th><th>门店 ID</th><th>门店名称</th><th>门店号</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            ${
              stores.length
                ? stores
                    .map(
                      (store) => `
                        <tr>
                          <td>${escapeHtml(store.createdAt || "-")}</td>
                          <td>${escapeHtml(store.id)}</td>
                          <td><strong>${escapeHtml(store.name)}</strong></td>
                          <td>${escapeHtml(store.storeNo)}</td>
                          <td><span class="tag ${store.enabled === false ? "" : "success"}">${store.enabled === false ? "停用" : "正常"}</span></td>
                          <td><button class="button link" type="button" data-action="open-store-detail" data-id="${store.id}">详情</button></td>
                        </tr>
                      `,
                    )
                    .join("")
                : `<tr><td class="empty-cell" colspan="6">暂无门店</td></tr>`
            }
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${stores.length} 条</span></div>
    </div>
  `;
}

function renderEinvoiceSettings() {
  const customer = currentCustomer();
  if (!customer.productOpen) {
    state.view = "customer-detail";
    state.customerTab = "products";
    render();
    showToast("请先开通客户电子发票产品");
    return;
  }
  const brand = state.settingsView === "brand-list" ? null : currentBrand();
  const importLabel = brand ? invoiceImportRuleLabel(brand, state.settingsImportKind) : "";
  const detailBreadcrumb = brand
    ? `
        <button type="button" data-action="back-brand-settings-list">电子发票设置</button>
        <span>/</span>
        <button type="button" data-action="back-brand-invoice-settings">${escapeHtml(brand.name)}品牌开票设置</button>
        ${
          state.settingsView === "import-records" || state.settingsView === "import-flow"
            ? `
              <span>/</span>
              <button type="button" data-action="back-invoice-import-rule">${escapeHtml(importLabel)}</button>
              <span>/</span>
              ${
                state.settingsView === "import-records"
                  ? "<strong>导入记录</strong>"
                  : `
                    <button type="button" data-action="back-invoice-import-records">导入记录</button>
                    <span>/</span>
                    <strong>导入任务</strong>
                  `
              }
            `
            : ""
        }
      `
    : "<strong>电子发票设置</strong>";
  app.innerHTML = `
    <div class="breadcrumb einvoice-settings-breadcrumb">
      <button type="button" data-action="back-customer-list">客户列表</button>
      <span>/</span>
      <button type="button" data-action="back-customer-detail" data-tab="products">客户详情</button>
      <span>/</span>
      ${detailBreadcrumb}
    </div>
    <section class="panel legacy-customer-detail einvoice-settings-page">
      ${
        state.settingsView === "brand-detail"
          ? renderBrandInvoiceSettings(customer)
          : state.settingsView === "import-records"
            ? renderInvoiceImportRecords(customer, brand)
            : state.settingsView === "import-flow"
              ? renderInvoiceImportFlow(customer, brand)
              : `
            <nav class="detail-tabs single-tab" aria-label="客户电子发票设置">
              <button class="active" type="button">品牌开票设置</button>
            </nav>
            ${renderInvoiceBrandList(customer)}
          `
      }
    </section>
  `;
}

function renderInvoiceBrandList(customer) {
  const nameKeyword = state.settingsBrandNameKeyword.toLowerCase();
  const idKeyword = state.settingsBrandIdKeyword.toLowerCase();
  const brands = customer.brands.filter(
    (brand) =>
      (!nameKeyword || brand.name.toLowerCase().includes(nameKeyword)) &&
      (!idKeyword || brand.id.toLowerCase().includes(idKeyword)),
  );
  return `
    <div class="einvoice-brand-list">
      <div class="filter-bar einvoice-brand-filter">
        <label class="field"><span>品牌名称</span><input id="settingsBrandNameInput" value="${escapeHtml(state.settingsBrandNameKeyword)}" placeholder="请输入品牌名称" /></label>
        <label class="field"><span>品牌编号</span><input id="settingsBrandIdInput" value="${escapeHtml(state.settingsBrandIdKeyword)}" placeholder="请输入品牌编号" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-brands">查询</button>
          <button class="button" type="button" data-action="reset-settings-brands">重置</button>
        </div>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>品牌名称</th><th>品牌编号</th><th>经营国家/地区</th><th>品牌描述</th><th>操作</th></tr></thead>
          <tbody>
            ${
              brands.length
                ? brands
                    .map(
                      (brand) => `
                        <tr>
                          <td><strong>${escapeHtml(brand.name)}</strong></td>
                          <td>${escapeHtml(brand.id)}</td>
                          <td>${escapeHtml(countries[brand.country] || "-")}</td>
                          <td>${escapeHtml(brand.description || "-")}</td>
                          <td><button class="button link" type="button" data-action="open-brand-invoice-settings" data-id="${brand.id}">设置</button></td>
                        </tr>
                      `,
                    )
                    .join("")
                : `<tr><td class="empty-cell" colspan="5">暂无品牌</td></tr>`
            }
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${brands.length} 条</span></div>
    </div>
  `;
}

function invoiceImportRuleLabel(brand, kind = state.settingsImportKind) {
  if (kind === "rules") return "商品开票匹配规则";
  return "税号兜底开票项目配置";
}

function invoiceImportTaskKey(customer, brand, kind = state.settingsImportKind) {
  return `${customer.id}:${brand.id}:${brand.country}:${kind}`;
}

function invoiceImportTemplateFields(brand, kind = state.settingsImportKind) {
  return kind === "rules"
    ? "商品大类、大类别名、税收分类编码、税种、税率、优惠政策、指定开票税号"
    : "税号、大类别名、税收分类编码、税种、税率、优惠政策";
}

function ensureInvoiceImportTasks(customer, brand, kind = state.settingsImportKind) {
  const key = invoiceImportTaskKey(customer, brand, kind);
  if (!state.settingsImportTasks[key]) {
    const suffix = `${brand.country}-${kind === "rules" ? "R" : "F"}`;
    state.settingsImportTasks[key] = [
      {
        id: `IMP-${suffix}-26072801`,
        createdAt: "2026-07-28 11:20:18",
        status: "completed",
        executable: 12,
        success: 12,
        failed: 0,
        operator: "刘辰浩",
        remark: "首批规则初始化",
        fileName: `${invoiceImportRuleLabel(brand, kind)}模板-首批.xlsx`,
      },
      {
        id: `IMP-${suffix}-26072702`,
        createdAt: "2026-07-27 16:42:09",
        status: "failed",
        executable: 8,
        success: 0,
        failed: 2,
        operator: "刘辰浩",
        remark: "存在无效编码",
        fileName: `${invoiceImportRuleLabel(brand, kind)}模板-修订.xlsx`,
      },
      {
        id: `IMP-${suffix}-26072701`,
        createdAt: "2026-07-27 10:08:36",
        status: "pending",
        executable: 6,
        success: 0,
        failed: 0,
        operator: "运营管理员",
        remark: "-",
        fileName: `${invoiceImportRuleLabel(brand, kind)}模板-待执行.xlsx`,
      },
    ];
  }
  return state.settingsImportTasks[key];
}

function invoiceImportStatus(task) {
  const statusMap = {
    pending: ["待执行", ""],
    checking: ["检查中", "warning"],
    checked: ["待执行", ""],
    executing: ["执行中", "warning"],
    completed: ["执行完成", "success"],
    failed: ["执行失败", "danger"],
    cancelled: ["已取消", ""],
  };
  const [label, className] = statusMap[task.status] || statusMap.pending;
  return `<span class="tag ${className}">${label}</span>`;
}

function invoiceImportResultText(task) {
  if (task.status === "pending" || task.status === "checked" || task.status === "checking" || task.status === "executing") return "-";
  return `可执行:${task.executable || 0} | <span class="success-text">成功:${task.success || 0}</span> | <span class="${task.failed ? "danger-text" : "muted-text"}">失败:${task.failed || 0}</span>`;
}

function renderInvoiceImportRecords(customer, brand) {
  if (!brand) return renderInvoiceBrandList(customer);
  const tasks = ensureInvoiceImportTasks(customer, brand);
  const label = invoiceImportRuleLabel(brand);
  return `
    <div class="invoice-import-page invoice-import-records">
      <div class="page-inline-toolbar">
        <button class="button" type="button" data-action="back-invoice-import-rule">返回</button>
        <div>
          <h2>${escapeHtml(label)}导入记录</h2>
          <p>${escapeHtml(brand.name)} · ${escapeHtml(countries[brand.country])}</p>
        </div>
        <button class="button primary" type="button" data-action="create-invoice-import-task">导入${escapeHtml(label)}</button>
      </div>
      <div class="table-scroll">
        <table class="data-table invoice-import-task-table">
          <thead><tr><th>创建时间</th><th>任务号</th><th>状态</th><th>执行结果</th><th>操作人</th><th>备注</th><th>操作</th></tr></thead>
          <tbody>
            ${tasks
              .map(
                (task) => `
                  <tr>
                    <td>${escapeHtml(task.createdAt)}</td>
                    <td>${escapeHtml(task.id)}</td>
                    <td>${invoiceImportStatus(task)}</td>
                    <td>${invoiceImportResultText(task)}</td>
                    <td>${escapeHtml(task.operator)}</td>
                    <td>${escapeHtml(task.remark || "-")}</td>
                    <td class="actions">
                      <button class="button link" type="button" data-action="open-invoice-import-task" data-id="${task.id}">详情</button>
                      ${task.status === "pending" || task.status === "checked" ? `<button class="button link" type="button" data-action="execute-invoice-import-task" data-id="${task.id}">立即执行</button>` : ""}
                    </td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="pagination"><span>共 ${tasks.length} 条</span></div>
    </div>
  `;
}

function invoiceImportStepState(step) {
  const stageOrder = {
    upload: 1,
    checking: 2,
    checked: 2,
    executing: 3,
    completed: 3,
    failed: 3,
    cancelled: 3,
  };
  const current = stageOrder[state.settingsImportStage] || 1;
  if (step < current) return "done";
  if (step === current) return "active";
  return "";
}

function renderInvoiceImportSteps() {
  return `
    <div class="invoice-import-steps" aria-label="导入步骤">
      ${["上传文件", "检查文件", "执行"]
        .map(
          (label, index) => `
            <div class="invoice-import-step ${invoiceImportStepState(index + 1)}">
              <span>${invoiceImportStepState(index + 1) === "done" ? "✓" : index + 1}</span>
              <strong>${label}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function currentInvoiceImportTask(customer, brand) {
  return ensureInvoiceImportTasks(customer, brand).find((task) => task.id === state.settingsImportTaskId) || null;
}

function renderInvoiceImportFlow(customer, brand) {
  if (!brand) return renderInvoiceBrandList(customer);
  const label = invoiceImportRuleLabel(brand);
  const task = currentInvoiceImportTask(customer, brand);
  return `
    <div class="invoice-import-page invoice-import-flow">
      <div class="page-inline-toolbar compact">
        <button class="button" type="button" data-action="back-invoice-import-records">返回导入记录</button>
        <div><h2>导入${escapeHtml(label)}</h2><p>${escapeHtml(brand.name)} · ${escapeHtml(countries[brand.country])}</p></div>
      </div>
      ${renderInvoiceImportSteps()}
      ${renderInvoiceImportStage(customer, brand, task)}
    </div>
  `;
}

function renderInvoiceImportStage(customer, brand, task) {
  const label = invoiceImportRuleLabel(brand);
  if (state.settingsImportStage === "upload") {
    return `
      <section class="invoice-import-stage">
        <div class="invoice-import-template-row">
          <div>
            <h3>1. 下载导入模板，根据模板提示完善内容</h3>
            <p>模板字段：${escapeHtml(invoiceImportTemplateFields(brand))}</p>
          </div>
          <button class="button" type="button" data-action="download-invoice-import-template">下载模板</button>
        </div>
        <div class="invoice-import-upload-row">
          <h3>2. 上传完善后的内容</h3>
          <label class="invoice-import-upload-box" for="invoiceImportFile">
            <span class="invoice-import-file-icon">X</span>
            <strong>上传文件</strong>
            <small>下载模板并完善信息后，可将文件拖到此处或点击上传，仅支持 .xlsx</small>
            <input id="invoiceImportFile" type="file" accept=".xlsx" hidden />
          </label>
          ${state.settingsImportFileName ? `<div class="invoice-import-file-name">📎 ${escapeHtml(state.settingsImportFileName)}</div>` : ""}
        </div>
        <textarea id="invoiceImportRemark" class="invoice-import-remark" placeholder="请填写备注信息（非必填）">${escapeHtml(state.settingsImportRemark)}</textarea>
        <div class="invoice-import-actions">
          <button class="button" type="button" data-action="back-invoice-import-records">返回列表</button>
          <button class="button primary" type="button" data-action="start-invoice-import-check" ${state.settingsImportFileName ? "" : "disabled"}>开始导入</button>
        </div>
      </section>
    `;
  }
  if (state.settingsImportStage === "checking") {
    return `
      <section class="invoice-import-stage invoice-import-progress">
        <div class="invoice-import-file-icon">X</div>
        <strong>${escapeHtml(task?.fileName || state.settingsImportFileName || `${label}.xlsx`)}</strong>
        <div class="invoice-import-progress-bar"><span style="width: 58%"></span></div>
        <p>58% · 预计剩余时间：计算中…</p>
        <button class="button" type="button" data-action="cancel-invoice-import-task">取消任务</button>
      </section>
    `;
  }
  if (state.settingsImportStage === "checked" || state.settingsImportStage === "pending") {
    const executable = task?.executable || 8;
    const failed = task?.failed || 0;
    return `
      <section class="invoice-import-stage invoice-import-check-result">
        <h3>请确定文件检查结果</h3>
        <p>可识别数据：${executable + failed} | <span class="danger-text">无法执行数据：${failed}</span> | 可执行数据：${executable}</p>
        <button class="button" type="button" data-action="download-invoice-import-check-report">下载检查报告</button>
        <div class="invoice-import-actions">
          <button class="button" type="button" data-action="back-invoice-import-records">返回列表</button>
          <button class="button" type="button" data-action="restart-invoice-import-upload">重新上传</button>
          <button class="button" type="button" data-action="cancel-invoice-import-task">取消任务</button>
          <button class="button primary" type="button" data-action="run-invoice-import-task" ${executable ? "" : "disabled"}>立即执行</button>
        </div>
      </section>
    `;
  }
  if (state.settingsImportStage === "executing") {
    return `
      <section class="invoice-import-stage invoice-import-progress">
        <div class="invoice-import-file-icon">X</div>
        <strong>${escapeHtml(task?.fileName || `${label}.xlsx`)}</strong>
        <div class="invoice-import-progress-bar"><span style="width: 72%"></span></div>
        <p>72% · 预计剩余时间：计算中…</p>
        <button class="button" type="button" data-action="back-invoice-import-records">返回列表</button>
      </section>
    `;
  }
  const completed = state.settingsImportStage === "completed";
  return `
    <section class="invoice-import-stage invoice-import-result ${completed ? "success" : "failed"}">
      <h3>${completed ? "✓ 执行成功" : state.settingsImportStage === "cancelled" ? "任务已取消" : "执行失败"}</h3>
      <p>共执行数据：${task?.executable || 0} | <span class="danger-text">执行失败数据：${task?.failed || 0}</span> | 执行成功数据：${task?.success || 0}</p>
      <button class="button" type="button" data-action="download-invoice-import-execution-report">下载执行报告</button>
      <div class="invoice-import-actions">
        <button class="button" type="button" data-action="back-invoice-import-records">返回列表</button>
      </div>
    </section>
  `;
}

function renderBrandInvoiceSettings(customer) {
  const brand = currentBrand();
  if (!brand) {
    state.settingsView = "brand-list";
    return renderInvoiceBrandList(customer);
  }
  ensureBrandInvoiceConfig(brand);
  const sharedContent =
    state.settingsTab === "rules"
      ? renderUnifiedRuleSettingsContent(customer, brand)
      : state.settingsTab === "fallback"
        ? renderUnifiedFallbackSettingsContent(customer, brand)
        : state.settingsTab === "payments"
          ? renderPaymentSettingsContent(brand)
          : "";
  if (brand.country === "MY") {
    return `
      <nav class="brand-config-tabs" aria-label="马来西亚品牌开票设置">
        ${settingsNavButton("stores", "门店开票设置")}
        ${settingsNavButton("rules", "商品开票匹配规则")}
        ${settingsNavButton("fallback", "税号兜底开票项目配置")}
        ${settingsNavButton("payments", "不可开票支付方式")}
      </nav>
      <div class="brand-settings-content">${sharedContent || renderMalaysiaSettingsContent(customer, brand)}</div>
    `;
  }
  return `
    <nav class="brand-config-tabs" aria-label="品牌开票设置">
      ${settingsNavButton("stores", "门店开票设置")}
      ${settingsNavButton("rules", "商品开票匹配规则")}
      ${settingsNavButton("fallback", "税号兜底开票项目配置")}
      ${settingsNavButton("payments", "不可开票支付方式")}
      ${settingsNavButton("application", "开票入口与申请页设置")}
    </nav>
    <div class="brand-settings-content">${sharedContent || renderChinaSettingsContent(customer, brand)}</div>
  `;
}

function ensureBrandInvoiceConfig(brand) {
  brand.config ||= {};
  brand.config.itemNameSource ||= "order-item";
  brand.config.rules ||= [];
  brand.config.fallbacks ||= [];
  brand.config.payments ||= [];
  brand.config.application ||= {};
  const application = brand.config.application;
  application.qrDays ||= "30";
  application.selfReissueEnabled ??= true;
  application.selfReissueMaxCount ||= "2";
  application.selfReissueValidDays ||= "180";
  application.pageStyle ||= "经典";
  application.theme ||= "black-gold";
  application.note ||= "请确认订单信息后提交开票申请。";
  application.noteHtml ||= application.note
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  application.logo ||= {
    source: "brand",
    fileName: "",
    dataUrl: "",
  };
  brand.config.rules.forEach((rule) => {
    rule.preferentialPolicy = rule.preferentialPolicy === "否" ? "无" : rule.preferentialPolicy || "无";
    rule.specifiedCompanyId ||= "";
    if (brand.country === "MY") {
      const classification = malaysiaClassificationCatalog.find((item) => item.code === rule.classification);
      const taxTypeCode = rule.taxType || (["6%", "8%"].includes(rule.taxRate) ? "02" : "01");
      const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode);
      rule.classificationName ||= classification?.name || "";
      rule.taxShortName ||= rule.classificationName;
      rule.taxType = taxTypeCode;
      rule.taxTypeName ||= taxType?.name || "";
      if (!taxType?.rates.includes(rule.taxRate)) rule.taxRate = taxType?.rates[0] || "";
    } else {
      rule.taxType = "VAT";
      rule.taxTypeName = "增值税";
    }
    rule.updatedAt ||= "2026-07-28 10:00";
  });
  brand.config.fallbacks.forEach((fallback) => {
    fallback.itemName ||= fallback.alias || "默认零售商品";
    fallback.preferentialPolicy = fallback.preferentialPolicy === "否" ? "无" : fallback.preferentialPolicy || "无";
    if (brand.country === "MY") {
      const classification = malaysiaClassificationCatalog.find((item) => item.code === fallback.classification);
      const taxTypeCode = fallback.taxType || (["6%", "8%"].includes(fallback.taxRate) ? "02" : "01");
      const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode);
      fallback.classificationName ||= classification?.name || "";
      fallback.taxShortName ||= fallback.classificationName;
      fallback.taxType = taxTypeCode;
      fallback.taxTypeName ||= taxType?.name || "";
      if (!taxType?.rates.includes(fallback.taxRate)) fallback.taxRate = taxType?.rates[0] || "";
    } else {
      fallback.taxType = "VAT";
      fallback.taxTypeName = "增值税";
    }
    fallback.updatedAt ||= "2026-07-28 10:00";
  });
  return brand.config;
}

function settingsNavButton(tab, label) {
  return `<button class="${state.settingsTab === tab ? "active" : ""}" type="button" data-action="settings-tab" data-tab="${tab}">${label}</button>`;
}

function taxTypeDisplayName(brand, item) {
  if (brand.country === "CN") return "增值税";
  return malaysiaTaxTypeCatalog.find((taxType) => taxType.code === item.taxType)?.description || "-";
}

function taxShortName(item) {
  return item.taxShortName || item.classificationName || "-";
}

function preferentialPolicyDisplay(item) {
  return item.preferentialPolicy === "否" ? "无" : item.preferentialPolicy || "无";
}

function renderUnifiedRuleSettingsContent(customer, brand) {
  const config = ensureBrandInvoiceConfig(brand);
  const categoryKeyword = state.settingsRuleCategoryKeyword.toLowerCase();
  const taxCodeKeyword = state.settingsRuleTaxCodeKeyword.toLowerCase();
  const rules = config.rules.filter(
    (rule) =>
      (!categoryKeyword || rule.category.toLowerCase().includes(categoryKeyword)) &&
      (!taxCodeKeyword || rule.classification.toLowerCase().includes(taxCodeKeyword)),
  );
  return `
    <section class="setting-block compact-setting-block">
      <div>
        <h2>发票明细项目名称</h2>
        <p>设置零售订单开票时发票明细行项目名称的取值来源。</p>
      </div>
      ${
        state.itemNameSourceEditing
          ? `
            <div class="inline-actions">
              <select id="itemNameSourceSelect">
                <option value="order-item" ${config.itemNameSource === "order-item" ? "selected" : ""}>取订单商品名称</option>
                <option value="category-alias" ${config.itemNameSource === "category-alias" ? "selected" : ""}>取商品大类别名</option>
              </select>
              <button class="button" type="button" data-action="cancel-item-name-source">取消</button>
              <button class="button primary" type="button" data-action="save-item-name-source">保存</button>
            </div>
          `
          : `
            <div class="inline-actions">
              <strong>${config.itemNameSource === "category-alias" ? "取商品大类别名" : "取订单商品名称"}</strong>
              <button class="button" type="button" data-action="edit-item-name-source">编辑</button>
            </div>
          `
      }
    </section>
    <p class="section-description">按品牌维度维护订单商品行的商品大类对应的开票税收分类编码。</p>
    <div class="filter-bar">
      <label class="field"><span>商品大类</span><input id="settingsRuleCategoryInput" value="${escapeHtml(state.settingsRuleCategoryKeyword)}" placeholder="请输入商品大类" /></label>
      <label class="field"><span>税收分类编码</span><input id="settingsRuleTaxCodeInput" value="${escapeHtml(state.settingsRuleTaxCodeKeyword)}" placeholder="请输入税收分类编码" /></label>
      <div class="filter-actions">
        <button class="button primary" type="button" data-action="search-settings-rules">查询</button>
        <button class="button" type="button" data-action="reset-settings-rules">重置</button>
      </div>
    </div>
    <div class="table-toolbar actions-only">
      <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="rules">批量导入</button><button class="button primary" type="button" data-action="create-rule">新增规则</button></div>
    </div>
    <div class="table-scroll">
      <table class="data-table wide">
        <thead><tr><th>商品大类</th><th>大类别名</th><th>税收分类编码</th><th>税收分类简称</th><th>税种</th><th>税率</th><th>优惠政策</th><th>指定开票税号</th><th>更新时间</th><th>操作</th></tr></thead>
        <tbody>
          ${
            rules.length
              ? rules
                  .map(
                    (rule) => `
                      <tr>
                        <td>${escapeHtml(rule.category)}</td>
                        <td>${escapeHtml(rule.alias)}</td>
                        <td>${escapeHtml(rule.classification)}</td>
                        <td>${escapeHtml(taxShortName(rule))}</td>
                        <td>${escapeHtml(taxTypeDisplayName(brand, rule))}</td>
                        <td>${escapeHtml(rule.taxRate)}</td>
                        <td>${escapeHtml(preferentialPolicyDisplay(rule))}</td>
                        <td>${escapeHtml(companyLicenseName(customer, rule.specifiedCompanyId))}</td>
                        <td>${escapeHtml(rule.updatedAt || "-")}</td>
                        <td><button class="button link" type="button" data-action="edit-rule" data-id="${rule.id}">编辑</button></td>
                      </tr>
                    `,
                  )
                  .join("")
              : `<tr><td class="empty-cell" colspan="10">暂无规则</td></tr>`
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderUnifiedFallbackSettingsContent(customer, brand) {
  const config = ensureBrandInvoiceConfig(brand);
  const taxNoKeyword = state.settingsFallbackTaxNoKeyword.toLowerCase();
  const taxCodeKeyword = state.settingsFallbackTaxCodeKeyword.toLowerCase();
  const fallbacks = config.fallbacks.filter((item) => {
    const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
    const taxNo = companyTaxNumber(company);
    return (!taxNoKeyword || taxNo.toLowerCase().includes(taxNoKeyword)) && (!taxCodeKeyword || item.classification.toLowerCase().includes(taxCodeKeyword));
  });
  return `
    <div class="section-heading">
      <h2>税号兜底开票项目配置</h2>
      <p>当订单商品行未命中商品大类规则时，系统根据订单对应门店使用的开票税号，匹配该税号配置的兜底开票项目、税收分类编码和税率。</p>
    </div>
    <div class="filter-bar">
      <label class="field"><span>税号</span><input id="settingsFallbackTaxNoInput" value="${escapeHtml(state.settingsFallbackTaxNoKeyword)}" placeholder="请输入税号" /></label>
      <label class="field"><span>税收分类编码</span><input id="settingsFallbackTaxCodeInput" value="${escapeHtml(state.settingsFallbackTaxCodeKeyword)}" placeholder="请输入税收分类编码" /></label>
      <div class="filter-actions">
        <button class="button primary" type="button" data-action="search-settings-fallbacks">查询</button>
        <button class="button" type="button" data-action="reset-settings-fallbacks">清空</button>
      </div>
    </div>
    <div class="table-toolbar actions-only">
      <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="fallbacks">批量导入</button><button class="button primary" type="button" data-action="create-fallback">新增规则</button></div>
    </div>
    <div class="table-scroll">
      <table class="data-table wide">
        <thead><tr><th>税号</th><th>纳税人名称</th><th>大类别名</th><th>税收分类编码</th><th>税收分类简称</th><th>税种</th><th>税率</th><th>优惠政策</th><th>更新时间</th><th>操作</th></tr></thead>
        <tbody>
          ${
            fallbacks.length
              ? fallbacks
                  .map((item) => {
                    const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
                    return `
                      <tr>
                        <td>${escapeHtml(companyTaxNumber(company) || "-")}</td>
                        <td>${escapeHtml(company?.legalName || "-")}</td>
                        <td>${escapeHtml(item.itemName || "-")}</td>
                        <td>${escapeHtml(item.classification)}</td>
                        <td>${escapeHtml(taxShortName(item))}</td>
                        <td>${escapeHtml(taxTypeDisplayName(brand, item))}</td>
                        <td>${escapeHtml(item.taxRate)}</td>
                        <td>${escapeHtml(preferentialPolicyDisplay(item))}</td>
                        <td>${escapeHtml(item.updatedAt || "-")}</td>
                        <td>
                          <button class="button link" type="button" data-action="edit-fallback" data-id="${item.id}">编辑</button>
                          <button class="button link danger-text" type="button" data-action="delete-fallback" data-id="${item.id}">删除</button>
                        </td>
                      </tr>
                    `;
                  })
                  .join("")
              : `<tr><td class="empty-cell" colspan="10">暂无规则</td></tr>`
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderPaymentSettingsContent(brand) {
  const config = ensureBrandInvoiceConfig(brand);
  return `
    <div class="panel-head settings-section-head">
      <div><h2>不可开票支付方式</h2><p>命中的支付方式金额不计入零售订单可开票金额。</p></div>
      <button class="button primary" type="button" data-action="create-payment">新增支付方式</button>
    </div>
    <div class="table-scroll">
      <table class="data-table">
        <thead><tr><th>支付方式编号</th><th>支付方式名称</th><th>更新时间</th><th>操作</th></tr></thead>
        <tbody>
          ${
            config.payments.length
              ? config.payments
                  .map(
                    (item) => `
                      <tr>
                        <td>${escapeHtml(item.code)}</td>
                        <td>${escapeHtml(item.name)}</td>
                        <td>${escapeHtml(item.updatedAt || "-")}</td>
                        <td><button class="button link" type="button" data-action="edit-payment" data-id="${item.id}">编辑</button></td>
                      </tr>
                    `,
                  )
                  .join("")
              : `<tr><td class="empty-cell" colspan="4">暂无支付方式</td></tr>`
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderMalaysiaSettingsContent(customer, brand) {
  const config = ensureBrandInvoiceConfig(brand);
  if (state.settingsTab === "stores") {
    const nameKeyword = state.settingsStoreNameKeyword.toLowerCase();
    const numberKeyword = state.settingsStoreNoKeyword.toLowerCase();
    const stores = brand.stores.filter(
      (store) =>
        (!nameKeyword || store.name.toLowerCase().includes(nameKeyword)) &&
        (!numberKeyword || store.storeNo.toLowerCase().includes(numberKeyword)),
    );
    return `
      <div class="filter-bar compact-filter">
        <label class="field"><span>门店名称</span><input id="settingsStoreNameInput" value="${escapeHtml(state.settingsStoreNameKeyword)}" placeholder="请输入门店名称" /></label>
        <label class="field"><span>门店编号</span><input id="settingsStoreNoInput" value="${escapeHtml(state.settingsStoreNoKeyword)}" placeholder="请输入门店编号" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-stores">查询</button>
          <button class="button" type="button" data-action="reset-settings-stores">重置</button>
        </div>
      </div>
      <div class="table-toolbar"><h3>门店列表</h3></div>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>门店名称</th><th>门店编号</th><th>开票税号</th><th>纳税人名称</th><th>开票状态</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              stores.length
                ? stores
                    .map((store) => {
                      const company = customer.companies.find((item) => item.id === store.companyId);
                      return `
                        <tr>
                          <td>${escapeHtml(store.name)}</td>
                          <td>${escapeHtml(store.storeNo)}</td>
                          <td>${escapeHtml(company?.licenses?.TIN || "-")}</td>
                          <td>${escapeHtml(company?.legalName || "-")}</td>
                          <td><span class="tag ${store.invoiceEnabled ? "success" : ""}">${store.invoiceEnabled ? "启用" : "禁用"}</span></td>
                          <td>${escapeHtml(store.updatedAt || store.createdAt || "-")}</td>
                          <td><button class="button link" type="button" data-action="toggle-store-invoice" data-id="${store.id}">${store.invoiceEnabled ? "禁用" : "开启"}</button></td>
                        </tr>
                      `;
                    })
                    .join("")
                : `<tr><td class="empty-cell" colspan="7">暂无门店</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.settingsTab === "rules") {
    const categoryKeyword = state.settingsRuleCategoryKeyword.toLowerCase();
    const classificationKeyword = state.settingsRuleTaxCodeKeyword.toLowerCase();
    const rules = config.rules.filter(
      (rule) =>
        (!categoryKeyword || rule.category.toLowerCase().includes(categoryKeyword)) &&
        (!classificationKeyword || rule.classification.toLowerCase().includes(classificationKeyword)),
    );
    return `
      <section class="setting-block compact-setting-block">
        <div>
          <h2>发票明细项目名称</h2>
          <p>设置零售订单开票时发票明细行项目名称的取值来源。</p>
        </div>
        ${
          state.itemNameSourceEditing
            ? `
              <div class="inline-actions">
                <select id="itemNameSourceSelect">
                  <option value="order-item" ${config.itemNameSource === "order-item" ? "selected" : ""}>取订单商品名称</option>
                  <option value="category-alias" ${config.itemNameSource === "category-alias" ? "selected" : ""}>取商品大类别名</option>
                </select>
                <button class="button" type="button" data-action="cancel-item-name-source">取消</button>
                <button class="button primary" type="button" data-action="save-item-name-source">保存</button>
              </div>
            `
            : `
              <div class="inline-actions">
                <strong>${config.itemNameSource === "category-alias" ? "取商品大类别名" : "取订单商品名称"}</strong>
                <button class="button" type="button" data-action="edit-item-name-source">编辑</button>
              </div>
            `
        }
      </section>
      <p class="section-description">按品牌和商品大类维护 MyInvois 商品分类、Tax Type 与 Tax Rate。</p>
      <div class="filter-bar">
        <label class="field"><span>商品大类</span><input id="settingsRuleCategoryInput" value="${escapeHtml(state.settingsRuleCategoryKeyword)}" placeholder="请输入商品大类" /></label>
        <label class="field"><span>商品分类编码（Classification Code）</span><input id="settingsRuleTaxCodeInput" value="${escapeHtml(state.settingsRuleTaxCodeKeyword)}" placeholder="请输入商品分类编码" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-rules">查询</button>
          <button class="button" type="button" data-action="reset-settings-rules">重置</button>
        </div>
      </div>
      <div class="table-toolbar actions-only">
        <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="rules">批量导入</button><button class="button primary" type="button" data-action="create-rule">新增规则</button></div>
      </div>
      <div class="table-scroll">
        <table class="data-table wide">
          <thead><tr><th>商品大类</th><th>大类别名</th><th>商品分类编码</th><th>商品分类名称</th><th>Tax Type</th><th>Tax Rate</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              rules.length
                ? rules
                    .map(
                      (rule) => `
                        <tr>
                          <td>${escapeHtml(rule.category)}</td>
                          <td>${escapeHtml(rule.alias)}</td>
                          <td>${escapeHtml(rule.classification)}</td>
                          <td>${escapeHtml(rule.classificationName || "-")}</td>
                          <td>${escapeHtml(rule.taxType)} ${escapeHtml(rule.taxTypeName || "")}</td>
                          <td>${escapeHtml(rule.taxRate)}</td>
                          <td>${escapeHtml(rule.updatedAt || "-")}</td>
                          <td><button class="button link" type="button" data-action="edit-rule" data-id="${rule.id}">编辑</button></td>
                        </tr>
                      `,
                    )
                    .join("")
                : `<tr><td class="empty-cell" colspan="8">暂无规则</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.settingsTab === "fallback") {
    const tinKeyword = state.settingsFallbackTaxNoKeyword.toLowerCase();
    const classificationKeyword = state.settingsFallbackTaxCodeKeyword.toLowerCase();
    const fallbacks = config.fallbacks.filter((item) => {
      const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
      const tin = company?.licenses?.TIN || "";
      return (!tinKeyword || tin.toLowerCase().includes(tinKeyword)) && (!classificationKeyword || item.classification.toLowerCase().includes(classificationKeyword));
    });
    return `
      <div class="section-heading">
        <h2>税号兜底开票规则</h2>
        <p>商品未命中商品开票匹配规则时，按门店已确定的 Supplier TIN 使用兜底发票明细信息。</p>
      </div>
      <div class="filter-bar">
        <label class="field"><span>税务识别号码（TIN）</span><input id="settingsFallbackTaxNoInput" value="${escapeHtml(state.settingsFallbackTaxNoKeyword)}" placeholder="请输入税务识别号码（TIN）" /></label>
        <label class="field"><span>商品分类编码（Classification Code）</span><input id="settingsFallbackTaxCodeInput" value="${escapeHtml(state.settingsFallbackTaxCodeKeyword)}" placeholder="请输入商品分类编码" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-fallbacks">查询</button>
          <button class="button" type="button" data-action="reset-settings-fallbacks">重置</button>
        </div>
      </div>
      <div class="table-toolbar actions-only">
        <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="fallbacks">批量导入</button><button class="button primary" type="button" data-action="create-fallback">新增规则</button></div>
      </div>
      <div class="table-scroll">
        <table class="data-table wide">
          <thead><tr><th>TIN</th><th>纳税人名称</th><th>兜底开票项目名称</th><th>商品分类编码</th><th>商品分类名称</th><th>Tax Type</th><th>Tax Rate</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              fallbacks.length
                ? fallbacks
                    .map((item) => {
                      const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
                      return `
                        <tr>
                          <td>${escapeHtml(company?.licenses?.TIN || "-")}</td>
                          <td>${escapeHtml(company?.legalName || "-")}</td>
                          <td>${escapeHtml(item.itemName)}</td>
                          <td>${escapeHtml(item.classification)}</td>
                          <td>${escapeHtml(item.classificationName || "-")}</td>
                          <td>${escapeHtml(item.taxType)} ${escapeHtml(item.taxTypeName || "")}</td>
                          <td>${escapeHtml(item.taxRate)}</td>
                          <td>${escapeHtml(item.updatedAt || "-")}</td>
                          <td>
                            <button class="button link" type="button" data-action="edit-fallback" data-id="${item.id}">编辑</button>
                            <button class="button link danger-text" type="button" data-action="delete-fallback" data-id="${item.id}">删除</button>
                          </td>
                        </tr>
                      `;
                    })
                    .join("")
                : `<tr><td class="empty-cell" colspan="9">暂无规则</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  state.settingsTab = "stores";
  return renderMalaysiaSettingsContent(customer, brand);
}

function renderChinaSettingsContent(customer, brand) {
  const config = ensureBrandInvoiceConfig(brand);
  if (state.settingsTab === "stores") {
    const nameKeyword = state.settingsStoreNameKeyword.toLowerCase();
    const numberKeyword = state.settingsStoreNoKeyword.toLowerCase();
    const stores = brand.stores.filter(
      (store) =>
        (!nameKeyword || store.name.toLowerCase().includes(nameKeyword)) &&
        (!numberKeyword || store.storeNo.toLowerCase().includes(numberKeyword)),
    );
    return `
      <div class="filter-bar compact-filter">
        <label class="field"><span>门店名称</span><input id="settingsStoreNameInput" value="${escapeHtml(state.settingsStoreNameKeyword)}" placeholder="请输入门店名称" /></label>
        <label class="field"><span>门店编号</span><input id="settingsStoreNoInput" value="${escapeHtml(state.settingsStoreNoKeyword)}" placeholder="请输入门店编号" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-stores">查询</button>
          <button class="button" type="button" data-action="reset-settings-stores">重置</button>
        </div>
      </div>
      <div class="table-toolbar"><h3>门店列表</h3></div>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>门店名称</th><th>门店编号</th><th>开票税号</th><th>纳税人名称</th><th>开票状态</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              stores.length
                ? stores
                    .map((store) => {
                      const company = customer.companies.find((item) => item.id === store.companyId);
                      return `
                        <tr>
                          <td>${escapeHtml(store.name)}</td>
                          <td>${escapeHtml(store.storeNo)}</td>
                          <td>${escapeHtml(company?.licenses?.USCC || "-")}</td>
                          <td>${escapeHtml(company?.legalName || "-")}</td>
                          <td><span class="tag ${store.invoiceEnabled ? "success" : ""}">${store.invoiceEnabled ? "启用" : "禁用"}</span></td>
                          <td>${escapeHtml(store.updatedAt || store.createdAt || "-")}</td>
                          <td><button class="button link" type="button" data-action="toggle-store-invoice" data-id="${store.id}">${store.invoiceEnabled ? "禁用" : "开启"}</button></td>
                        </tr>
                      `;
                    })
                    .join("")
                : `<tr><td class="empty-cell" colspan="7">暂无门店</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.settingsTab === "rules") {
    const categoryKeyword = state.settingsRuleCategoryKeyword.toLowerCase();
    const taxCodeKeyword = state.settingsRuleTaxCodeKeyword.toLowerCase();
    const rules = config.rules.filter(
      (rule) =>
        (!categoryKeyword || rule.category.toLowerCase().includes(categoryKeyword)) &&
        (!taxCodeKeyword || rule.classification.toLowerCase().includes(taxCodeKeyword)),
    );
    return `
      <section class="setting-block compact-setting-block">
        <div>
          <h2>发票明细项目名称</h2>
          <p>设置零售订单开票时发票明细行项目名称的取值来源。</p>
        </div>
        ${
          state.itemNameSourceEditing
            ? `
              <div class="inline-actions">
                <select id="itemNameSourceSelect">
                  <option value="order-item" ${config.itemNameSource === "order-item" ? "selected" : ""}>取订单商品名称</option>
                  <option value="category-alias" ${config.itemNameSource === "category-alias" ? "selected" : ""}>取商品大类别名</option>
                </select>
                <button class="button" type="button" data-action="cancel-item-name-source">取消</button>
                <button class="button primary" type="button" data-action="save-item-name-source">保存</button>
              </div>
            `
            : `
              <div class="inline-actions">
                <strong>${config.itemNameSource === "category-alias" ? "取商品大类别名" : "取订单商品名称"}</strong>
                <button class="button" type="button" data-action="edit-item-name-source">编辑</button>
              </div>
            `
        }
      </section>
      <p class="section-description">按品牌维度维护订单商品行的商品大类对应的开票税收分类编码</p>
      <div class="filter-bar">
        <label class="field"><span>商品大类</span><input id="settingsRuleCategoryInput" value="${escapeHtml(state.settingsRuleCategoryKeyword)}" placeholder="请输入商品大类" /></label>
        <label class="field"><span>税收分类编码</span><input id="settingsRuleTaxCodeInput" value="${escapeHtml(state.settingsRuleTaxCodeKeyword)}" placeholder="请输入税收分类编码" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-rules">查询</button>
          <button class="button" type="button" data-action="reset-settings-rules">重置</button>
        </div>
      </div>
      <div class="table-toolbar actions-only">
        <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="rules">批量导入</button><button class="button primary" type="button" data-action="create-rule">新增规则</button></div>
      </div>
      <div class="table-scroll">
        <table class="data-table wide">
          <thead><tr><th>商品大类</th><th>大类别名</th><th>税收分类编码</th><th>税收分类简称</th><th>税率</th><th>优惠政策</th><th>指定开票税号</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              rules.length
                ? rules
                    .map(
                      (rule) => `
                        <tr>
                          <td>${escapeHtml(rule.category)}</td>
                          <td>${escapeHtml(rule.alias)}</td>
                          <td>${escapeHtml(rule.classification)}</td>
                          <td>${escapeHtml(rule.taxShortName || "-")}</td>
                          <td>${escapeHtml(rule.taxRate)}</td>
                          <td>${escapeHtml(rule.preferentialPolicy || "否")}</td>
                          <td>${escapeHtml(companyLicenseName(customer, rule.specifiedCompanyId))}</td>
                          <td>${escapeHtml(rule.updatedAt || "-")}</td>
                          <td><button class="button link" type="button" data-action="edit-rule" data-id="${rule.id}">编辑</button></td>
                        </tr>
                      `,
                    )
                    .join("")
                : `<tr><td class="empty-cell" colspan="9">暂无规则</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.settingsTab === "fallback") {
    const taxNoKeyword = state.settingsFallbackTaxNoKeyword.toLowerCase();
    const taxCodeKeyword = state.settingsFallbackTaxCodeKeyword.toLowerCase();
    const fallbacks = config.fallbacks.filter((item) => {
      const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
      const taxNo = companyTaxNumber(company);
      return (!taxNoKeyword || taxNo.toLowerCase().includes(taxNoKeyword)) && (!taxCodeKeyword || item.classification.toLowerCase().includes(taxCodeKeyword));
    });
    return `
      <div class="section-heading">
        <h2>税号兜底开票项目配置</h2>
        <p>当订单商品行未命中商品大类规则时，系统根据订单对应门店使用的开票税号，匹配该税号配置的兜底开票项目、税收分类编码和税率。</p>
      </div>
      <div class="filter-bar">
        <label class="field"><span>税号</span><input id="settingsFallbackTaxNoInput" value="${escapeHtml(state.settingsFallbackTaxNoKeyword)}" placeholder="请输入税号" /></label>
        <label class="field"><span>税收分类编码</span><input id="settingsFallbackTaxCodeInput" value="${escapeHtml(state.settingsFallbackTaxCodeKeyword)}" placeholder="请输入税收分类编码" /></label>
        <div class="filter-actions">
          <button class="button primary" type="button" data-action="search-settings-fallbacks">查询</button>
          <button class="button" type="button" data-action="reset-settings-fallbacks">清空</button>
        </div>
      </div>
      <div class="table-toolbar actions-only">
        <div class="inline-actions"><button class="button" type="button" data-action="open-invoice-import-records" data-kind="fallbacks">批量导入</button><button class="button primary" type="button" data-action="create-fallback">新增规则</button></div>
      </div>
      <div class="table-scroll">
        <table class="data-table wide">
          <thead><tr><th>税号</th><th>纳税人名称</th><th>大类别名</th><th>税收分类编码</th><th>税收分类简称</th><th>税率</th><th>优惠政策</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>
            ${
              fallbacks.length
                ? fallbacks
                    .map((item) => {
                      const company = customer.companies.find((companyItem) => companyItem.id === item.companyId);
                      return `
                        <tr>
                          <td>${escapeHtml(companyTaxNumber(company) || "-")}</td>
                          <td>${escapeHtml(company?.legalName || "-")}</td>
                          <td>${escapeHtml(item.itemName)}</td>
                          <td>${escapeHtml(item.classification)}</td>
                          <td>${escapeHtml(item.taxShortName || "-")}</td>
                          <td>${escapeHtml(item.taxRate)}</td>
                          <td>${escapeHtml(item.preferentialPolicy === "否" ? "无" : item.preferentialPolicy || "无")}</td>
                          <td>${escapeHtml(item.updatedAt || "-")}</td>
                          <td>
                            <button class="button link" type="button" data-action="edit-fallback" data-id="${item.id}">编辑</button>
                            <button class="button link danger-text" type="button" data-action="delete-fallback" data-id="${item.id}">删除</button>
                          </td>
                        </tr>
                      `;
                    })
                    .join("")
                : `<tr><td class="empty-cell" colspan="9">暂无规则</td></tr>`
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.settingsTab === "payments") {
    return renderPaymentSettingsContent(brand);
  }
  return renderApplicationSettings(brand, config.application);
}

const applicationThemeNames = {
  "black-gold": "黑金",
  "black-white": "黑白",
  "red-white": "红白",
};

function resetApplicationEditorState() {
  state.applicationEditMode = {
    qr: false,
    selfReissue: false,
    page: false,
  };
  state.applicationDraft = null;
  state.applicationDraftBrandId = "";
  state.applicationErrors = {
    qr: "",
    selfReissue: "",
    page: "",
  };
}

function applicationDraftFor(brand, application) {
  if (!state.applicationDraft || state.applicationDraftBrandId !== brand.id) {
    state.applicationDraft = structuredClone(application);
    state.applicationDraftBrandId = brand.id;
  }
  return state.applicationDraft;
}

function applicationLogoMarkup(brand, logo, className = "") {
  if (logo?.source === "custom" && String(logo.dataUrl || "").startsWith("data:image/")) {
    return `<span class="application-brand-logo ${className} custom"><img src="${escapeHtml(logo.dataUrl)}" alt="${escapeHtml(brand.name)} Logo" /></span>`;
  }
  return `<span class="application-brand-logo ${className}">${escapeHtml(brand.logoHorizontalText || brand.name)}</span>`;
}

function sanitizeApplicationNoteHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
}

function applicationPhonePreview(brand, application) {
  const themeClass = application.theme === "black-white" ? "theme-black-white" : application.theme === "red-white" ? "theme-red-white" : "";
  return `
    <aside class="application-phone-preview ${themeClass}" aria-label="开票申请页预览">
      <div class="application-phone-statusbar"><span>15:57</span><span>••• ︶▯</span></div>
      <div class="application-phone-nav">
        <span>×</span>
        <div><h3>电子发票</h3><p>uinvoice-merchant-support-universal-h5.iwosai.com</p></div>
        <span>•••</span>
      </div>
      ${applicationLogoMarkup(brand, application.logo, "application-phone-brand-logo")}
      <div class="application-phone-content">
        <div class="application-phone-order-grid">
          <div><span>订单金额:</span><strong>¥ 15.60</strong></div>
          <div><span>可开票金额:</span><strong>¥ 15.60</strong></div>
        </div>
        <div class="application-phone-order-no"><span>订单号:</span><strong>1735282129</strong></div>
        <div class="application-phone-invoice-tabs"><button class="active" type="button">普票</button><button type="button">专票</button></div>
        <div class="application-phone-radio-row">
          <span><i></i>企业</span>
          <span><i class="checked"></i>个人及非营利企事业单位</span>
        </div>
        <div class="application-phone-input-row"><span>请输入抬头（必填）</span><strong>选择抬头</strong></div>
        <div class="application-phone-more">填写更多⌄</div>
        <div class="application-phone-form-label">发票接收方式</div>
        <div class="application-phone-input-row full"><span>请输入您的邮箱（必填）</span></div>
        <button class="application-phone-submit" type="button">申请开票</button>
        <div class="application-phone-bottom-title">电子发票开票说明</div>
      </div>
    </aside>
  `;
}

function renderApplicationSettings(brand, application) {
  const draft = applicationDraftFor(brand, application);
  const qrModel = state.applicationEditMode.qr ? draft : application;
  const reissueModel = state.applicationEditMode.selfReissue ? draft : application;
  const pageModel = state.applicationEditMode.page ? draft : application;
  const qrActions = state.applicationEditMode.qr
    ? `<button class="button" type="button" data-action="cancel-application-section" data-section="qr">取消</button><button class="button primary" type="button" data-action="save-application-section" data-section="qr">保存</button>`
    : `<button class="button" type="button" data-action="edit-application-section" data-section="qr">编辑</button>`;
  const reissueActions = state.applicationEditMode.selfReissue
    ? `<button class="button" type="button" data-action="cancel-application-section" data-section="selfReissue">取消</button><button class="button primary" type="button" data-action="save-application-section" data-section="selfReissue">保存</button>`
    : `<button class="button" type="button" data-action="edit-application-section" data-section="selfReissue">编辑</button>`;
  const pageActions = state.applicationEditMode.page
    ? `<button class="button" type="button" data-action="cancel-application-section" data-section="page">取消</button><button class="button primary" type="button" data-action="save-application-section" data-section="page">保存</button>`
    : `<button class="button" type="button" data-action="edit-application-section" data-section="page">编辑</button>`;

  return `
    <div class="application-settings-stack">
      <section class="application-setting-block">
        <div class="application-setting-head">
          <h2>开票二维码有效期</h2>
          <div class="application-setting-actions">${qrActions}</div>
        </div>
        ${
          state.applicationEditMode.qr
            ? `
              <label class="application-inline-field">
                <strong>小票二维码有效期</strong>
                <span class="application-input-affix"><input id="applicationQrDays" type="number" min="1" step="1" value="${escapeHtml(qrModel.qrDays)}" /><em>天</em></span>
              </label>
              ${state.applicationErrors.qr ? `<p class="application-field-error">${escapeHtml(state.applicationErrors.qr)}</p>` : ""}
            `
            : `<dl class="application-detail-list compact"><div><dt>小票二维码有效期</dt><dd>${escapeHtml(application.qrDays)} 天</dd></div></dl>`
        }
      </section>

      <section class="application-setting-block">
        <div class="application-setting-head">
          <div><h2>自助换开</h2><p>限制消费者通过收钱吧开票申请页自助换开发票。</p></div>
          <div class="application-setting-actions">${reissueActions}</div>
        </div>
        ${
          state.applicationEditMode.selfReissue
            ? `
              <label class="application-switch-row">
                <span><strong>允许消费者自助换开</strong><small>关闭后，消费者不能通过收钱吧开票申请页发起换开。</small></span>
                <span class="application-switch"><input id="applicationSelfReissueEnabled" type="checkbox" ${reissueModel.selfReissueEnabled ? "checked" : ""} /><i aria-hidden="true"></i></span>
              </label>
              ${
                reissueModel.selfReissueEnabled
                  ? `
                    <div class="application-reissue-fields">
                      <label><strong>每张发票最多换开</strong><span><input id="applicationSelfReissueMaxCount" type="number" min="1" step="1" value="${escapeHtml(reissueModel.selfReissueMaxCount)}" /> 次</span></label>
                      <label><strong>可换开时间范围</strong><span>原发票开具成功后 <input id="applicationSelfReissueValidDays" type="number" min="1" step="1" value="${escapeHtml(reissueModel.selfReissueValidDays)}" /> 天内</span></label>
                    </div>
                  `
                  : ""
              }
              ${state.applicationErrors.selfReissue ? `<p class="application-field-error">${escapeHtml(state.applicationErrors.selfReissue)}</p>` : ""}
            `
            : application.selfReissueEnabled
              ? `
                <dl class="application-detail-list compact">
                  <div><dt>自助换开</dt><dd>已开启</dd></div>
                  <div><dt>每张发票最多换开</dt><dd>${escapeHtml(application.selfReissueMaxCount)} 次</dd></div>
                  <div><dt>可换开时间范围</dt><dd>原发票开具成功后 ${escapeHtml(application.selfReissueValidDays)} 天内</dd></div>
                </dl>
              `
              : `<dl class="application-detail-list compact"><div><dt>自助换开</dt><dd>已关闭</dd></div></dl><p class="application-setting-hint">消费者不能通过收钱吧开票申请页自助换开。</p>`
        }
      </section>

      <section class="application-setting-block">
        <div class="application-setting-head">
          <h2>开票申请页设置</h2>
          <div class="application-setting-actions">${pageActions}</div>
        </div>
        <div class="application-entry-grid">
          <div class="application-entry-form">
            ${
              state.applicationEditMode.page
                ? `
                  <label class="application-form-field"><strong>页面风格</strong><select id="applicationPageStyle"><option value="经典">经典</option></select></label>
                  <div class="application-theme-group">
                    <strong>主题色</strong>
                    <div>
                      <button class="application-theme-chip ${pageModel.theme === "black-gold" ? "active" : ""}" type="button" data-action="select-application-theme" data-theme="black-gold"><span class="application-swatch black-gold"></span>黑金</button>
                      <button class="application-theme-chip ${pageModel.theme === "black-white" ? "active" : ""}" type="button" data-action="select-application-theme" data-theme="black-white"><span class="application-swatch black-white"></span>黑白</button>
                      <button class="application-theme-chip ${pageModel.theme === "red-white" ? "active" : ""}" type="button" data-action="select-application-theme" data-theme="red-white"><span class="application-swatch red-white"></span>红白</button>
                    </div>
                  </div>
                  <div class="application-logo-setting">
                    <strong>品牌 Logo</strong>
                    <p>默认读取品牌横版 Logo，可单独上传 Logo 进行替代。</p>
                    <div class="application-logo-editor">
                      ${applicationLogoMarkup(brand, pageModel.logo, "edit-preview")}
                      <div class="application-logo-actions">
                        <input class="hidden" id="applicationLogoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" />
                        <div><button class="button" type="button" data-action="upload-application-logo">上传 Logo</button><button class="button link" type="button" data-action="restore-application-logo" ${pageModel.logo?.source === "custom" ? "" : "disabled"}>恢复品牌横版 Logo</button></div>
                        <small>${pageModel.logo?.source === "custom" ? `已选择：${escapeHtml(pageModel.logo.fileName || "自定义 Logo")}` : "当前使用品牌横版 Logo"}</small>
                      </div>
                    </div>
                  </div>
                  <div class="application-rich-label">
                    <strong>开票说明</strong>
                    <div class="application-editor-toolbar" aria-label="富文本工具栏">
                      <button type="button" data-action="application-rich-command" data-command="bold">B</button>
                      <button type="button" data-action="application-rich-command" data-command="insertUnorderedList">列表</button>
                      <button type="button" data-action="application-rich-command" data-command="removeFormat">清除格式</button>
                    </div>
                    <div class="application-rich-editor" id="applicationNoteEditor" contenteditable="true">${sanitizeApplicationNoteHtml(pageModel.noteHtml)}</div>
                  </div>
                  ${state.applicationErrors.page ? `<p class="application-field-error">${escapeHtml(state.applicationErrors.page)}</p>` : ""}
                `
                : `
                  <dl class="application-detail-list">
                    <div><dt>页面风格</dt><dd>${escapeHtml(application.pageStyle)}</dd></div>
                    <div><dt>主题色</dt><dd>${escapeHtml(applicationThemeNames[application.theme] || "-")}</dd></div>
                    <div><dt>品牌 Logo</dt><dd>${applicationLogoMarkup(brand, application.logo)}</dd></div>
                    <div><dt>开票说明</dt><dd class="application-note-view">${sanitizeApplicationNoteHtml(application.noteHtml)}</dd></div>
                  </dl>
                `
            }
          </div>
          ${applicationPhonePreview(brand, pageModel)}
        </div>
      </section>
    </div>
  `;
}

function companyLicenseName(customer, companyId) {
  if (!companyId) return "-";
  const company = customer.companies.find((item) => item.id === companyId);
  if (!company) return "-";
  return company.licenses?.USCC || company.licenses?.TIN || "-";
}

function blankCustomer(customerType) {
  return {
    id: "",
    name: "",
    shortName: "",
    customerType,
    industryLevelOneCode: "",
    industryLevelOneName: "",
    industryLevelTwoCode: "",
    industryLevelTwoName: "",
    projectNo: "",
    standardLogo: "",
    horizontalLogo: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    salesName: "",
    salesOrg: "",
    customerExecutive: "",
    remark: "",
    createdAt: "",
    productOpen: false,
    companies: [],
    brands: [],
  };
}

function openCustomerEditor(customerType = "KA", customerId = "") {
  const customer = state.customers.find((item) => item.id === customerId);
  state.modalContext = customer ? "customer-edit" : "customer-create";
  state.customerDraft = customer ? structuredClone(customer) : blankCustomer(customerType);
  state.customerErrors = {};
  renderCustomerEditor();
}

function customerUploadField({ id, label, value, horizontal = false }) {
  return `
    <div class="legacy-form-row legacy-upload-row">
      <span class="legacy-form-label">${escapeHtml(label)}：</span>
      <div>
        <label class="legacy-upload-box ${horizontal ? "horizontal" : ""}" for="${id}">
          <span class="upload-plus">＋</span>
          <span>${value ? "重新上传" : "上传照片"}</span>
        </label>
        <input class="hidden" id="${id}" type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" />
        <div class="legacy-upload-help">${horizontal ? "图片格式必须为：png，jpg；不可大于4M；宽高建议：320px*64px" : "图片格式必须为：png，jpg；不可大于4M；宽高比例：1:1"}</div>
        <div class="legacy-upload-name" id="${id}Name">${escapeHtml(value || "")}</div>
      </div>
    </div>
  `;
}

function renderCustomerEditor() {
  const draft = state.customerDraft;
  const errors = state.customerErrors;
  const isEdit = Boolean(draft.id);
  const selectedSales = salesOptions.find((sales) => sales.name === draft.salesName);
  const executiveOptions = Array.from(new Set(salesOptions.map((sales) => sales.executive)));
  openModal({
    title: isEdit ? "编辑客户信息" : `新增${customerTypes[draft.customerType]}`,
    drawer: true,
    className: "customer-master-drawer",
    body: `
      <div class="legacy-drawer-section">
        <h3>基本信息</h3>
        <label class="legacy-form-row required">
          <span class="legacy-form-label">客户名称：</span>
          <div><input id="customerName" class="${errors.name ? "field-error" : ""}" value="${escapeHtml(draft.name)}" placeholder="请输入客户名称" /><span class="field-message">${escapeHtml(errors.name || "")}</span></div>
        </label>
        <label class="legacy-form-row">
          <span class="legacy-form-label">客户简称：</span>
          <input id="customerShortName" value="${escapeHtml(draft.shortName)}" placeholder="请输入客户简称" />
        </label>
        ${renderIndustryFields({ prefix: "customer", record: draft, error: errors.industry, legacy: true })}
        ${isEdit ? `<div class="legacy-form-row"><span class="legacy-form-label">项目编号：</span><span class="legacy-readonly">${escapeHtml(draft.projectNo)}</span></div><div class="legacy-form-row"><span class="legacy-form-label">客户类型：</span><span class="legacy-readonly">${escapeHtml(customerTypes[draft.customerType])}</span></div>` : ""}
        ${customerUploadField({ id: "customerStandardLogo", label: "客户标准logo", value: draft.standardLogo })}
        ${customerUploadField({ id: "customerHorizontalLogo", label: "客户横版logo", value: draft.horizontalLogo, horizontal: true })}
      </div>
      <div class="legacy-drawer-section">
        <h3>联系人信息</h3>
        <label class="legacy-form-row"><span class="legacy-form-label">联系人姓名：</span><input id="customerContactName" value="${escapeHtml(draft.contactName)}" placeholder="请输入联系人姓名" /></label>
        <label class="legacy-form-row"><span class="legacy-form-label">联系人电话：</span><input id="customerContactPhone" value="${escapeHtml(draft.contactPhone)}" placeholder="请输入联系人电话" /></label>
        <label class="legacy-form-row"><span class="legacy-form-label">联系人邮箱：</span><input id="customerContactEmail" value="${escapeHtml(draft.contactEmail)}" placeholder="请输入联系人邮箱" /></label>
      </div>
      <div class="legacy-drawer-section">
        <h3>销售信息</h3>
        <label class="legacy-form-row required">
          <span class="legacy-form-label">所属销售：</span>
          <div>
            <select id="customerSales" class="${errors.salesName ? "field-error" : ""}">
              <option value="">点击选择</option>
              ${salesOptions.map((sales) => `<option value="${escapeHtml(sales.name)}" ${draft.salesName === sales.name ? "selected" : ""}>${escapeHtml(sales.name)}</option>`).join("")}
            </select>
            <span class="field-message">${escapeHtml(errors.salesName || "")}</span>
          </div>
        </label>
        <div class="legacy-form-row"><span class="legacy-form-label">销售组织：</span><span class="legacy-readonly" id="customerSalesOrg">${escapeHtml(selectedSales?.organization || draft.salesOrg || "-")}</span></div>
        <label class="legacy-form-row required">
          <span class="legacy-form-label">客户执行：</span>
          <div>
            <select id="customerExecutive" class="${errors.customerExecutive ? "field-error" : ""}">
              <option value="">点击选择</option>
              ${executiveOptions.map((executive) => `<option value="${escapeHtml(executive)}" ${draft.customerExecutive === executive ? "selected" : ""}>${escapeHtml(executive)}</option>`).join("")}
            </select>
            <span class="field-message">${escapeHtml(errors.customerExecutive || "")}</span>
          </div>
        </label>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-customer">确定</button>`,
  });
}

function readCustomerDraftFromForm() {
  const value = (id) => document.getElementById(id)?.value.trim() ?? "";
  state.customerDraft.name = value("customerName");
  state.customerDraft.shortName = value("customerShortName");
  readIndustrySelectionFromForm(state.customerDraft, "customer");
  state.customerDraft.contactName = value("customerContactName");
  state.customerDraft.contactPhone = value("customerContactPhone");
  state.customerDraft.contactEmail = value("customerContactEmail");
  state.customerDraft.salesName = value("customerSales");
  state.customerDraft.customerExecutive = value("customerExecutive");
  const sales = salesOptions.find((item) => item.name === state.customerDraft.salesName);
  state.customerDraft.salesOrg = sales?.organization || "";
}

function saveCustomer() {
  readCustomerDraftFromForm();
  const draft = state.customerDraft;
  state.customerErrors = {};
  if (!draft.name) state.customerErrors.name = "请输入客户名称";
  if (!draft.industryLevelTwoCode) state.customerErrors.industry = "请选择二级行业";
  if (!draft.salesName) state.customerErrors.salesName = "请选择所属销售";
  if (!draft.customerExecutive) state.customerErrors.customerExecutive = "请选择客户执行";
  if (Object.keys(state.customerErrors).length) {
    renderCustomerEditor();
    return;
  }

  const existing = state.customers.find((customer) => customer.id === draft.id);
  if (existing) {
    Object.assign(existing, draft);
  } else {
    draft.id = nextCustomerId();
    draft.projectNo = `${draft.customerType}-${String(Date.now()).slice(-6)}`;
    draft.createdAt = "2026-07-28 10:30:00";
    state.customers.unshift(draft);
  }
  const savedId = draft.id;
  closeModal();
  if (existing) {
    state.currentCustomerId = savedId;
    state.view = "customer-detail";
    state.customerTab = "basic";
  }
  render();
  showToast(existing ? "客户信息已更新" : "客户创建成功");
}

function confirmProductOpen() {
  const customer = currentCustomer();
  state.modalContext = "product-open";
  openModal({
    title: "开通电子发票",
    body: `
      <div class="notice"><span>确认后，将为该客户开放电子发票产品能力。</span></div>
      <dl class="review-list">
        <div><dt>客户名称</dt><dd>${escapeHtml(customer.name)}</dd></div>
        <div><dt>客户编号</dt><dd>${escapeHtml(customer.id)}</dd></div>
      </dl>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="open-product-now">确认开通</button>`,
  });
}

function openProductNow() {
  currentCustomer().productOpen = true;
  closeModal();
  render();
  showToast("客户电子发票产品已开通");
}

function blankCompany(country) {
  return {
    id: "",
    country,
    type: "Head",
    parentCompanyId: "",
    legalName: "",
    address: "",
    email: "",
    phone: "",
    industryLevelOneCode: "",
    industryLevelOneName: "",
    industryLevelTwoCode: "",
    industryLevelTwoName: "",
    businessDesc: "",
    remark: "",
    createdAt: "",
    licenses: country === "MY" ? { BRN: "", TIN: "", SST: "" } : country === "CN" ? { USCC: "" } : {},
    invoiceStatus: "unopened",
    taxpayerExists: false,
    openAttempted: false,
    openedAt: "",
  };
}

function openCompanyEditor(companyId = "") {
  const customer = currentCustomer();
  const company = customer.companies.find((item) => item.id === companyId);
  state.modalContext = "company-editor";
  state.companyDraft = company ? structuredClone(company) : blankCompany("");
  state.companyDraft.type ||= "Head";
  state.companyDraft.parentCompanyId ||= "";
  state.companyErrors = {};
  renderCompanyEditor();
}

function hasCompanyDraftContent(draft) {
  return Boolean(
    draft.legalName ||
      draft.address ||
      draft.email ||
      draft.phone ||
      draft.industryLevelTwoCode ||
      draft.businessDesc ||
      draft.remark ||
      draft.parentCompanyId ||
      Object.values(draft.licenses || {}).some(Boolean),
  );
}

function readCompanyDraftFromForm() {
  if (!state.companyDraft) return;
  const value = (id, fallback = "") => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : fallback;
  };
  state.companyDraft.type = value("companyType", state.companyDraft.type) || "Head";
  state.companyDraft.parentCompanyId =
    state.companyDraft.type === "Branch" ? value("companyParentCompany", state.companyDraft.parentCompanyId) : "";
  state.companyDraft.legalName = value("companyLegalName", state.companyDraft.legalName);
  state.companyDraft.address = value("companyAddress", state.companyDraft.address);
  state.companyDraft.email = value("companyEmail", state.companyDraft.email);
  state.companyDraft.phone = value("companyPhone", state.companyDraft.phone);
  if (state.companyDraft.country === "MY") {
    readIndustrySelectionFromForm(state.companyDraft, "company");
  }
  state.companyDraft.businessDesc = value("companyBusinessDesc", state.companyDraft.businessDesc);
  state.companyDraft.remark = value("companyRemark", state.companyDraft.remark);
  if (state.companyDraft.country === "MY") {
    state.companyDraft.licenses.BRN = value("companyBRN", state.companyDraft.licenses.BRN);
    state.companyDraft.licenses.TIN = value("companyTIN", state.companyDraft.licenses.TIN);
    state.companyDraft.licenses.SST = value("companySST", state.companyDraft.licenses.SST);
  } else {
    state.companyDraft.licenses.USCC = value("companyUSCC", state.companyDraft.licenses.USCC);
  }
}

function renderCompanyEditor() {
  const draft = state.companyDraft;
  const errors = state.companyErrors;
  const isEdit = Boolean(draft.id);
  const malaysiaRequired = draft.country === "MY" ? "required" : "";
  const eligibleParents = currentCustomer().companies.filter(
    (company) => company.id !== draft.id && (company.type || "Head") === "Head" && company.country === draft.country,
  );
  const parentField =
    draft.type === "Branch"
      ? `
        <label class="field required"><span>上级公司</span>
          <select id="companyParentCompany" class="${errors.parentCompanyId ? "field-error" : ""}">
            <option value="">请选择同国家/地区的总公司</option>
            ${eligibleParents.map((company) => `<option value="${company.id}" ${draft.parentCompanyId === company.id ? "selected" : ""}>${escapeHtml(company.legalName)}</option>`).join("")}
          </select>
          <span class="field-message">${escapeHtml(errors.parentCompanyId || (eligibleParents.length ? "" : "当前客户下暂无可关联的同国总公司"))}</span>
        </label>
      `
      : "";
  const chinaFields = isEdit
    ? `
      <label class="field"><span>统一社会信用代码</span><div class="readonly-value">${escapeHtml(draft.licenses.USCC || "-")}</div></label>
      <label class="field"><span>公司名称</span><div class="readonly-value">${escapeHtml(draft.legalName || "-")}</div></label>
      <label class="field required"><span>是否为分公司</span>
        <select id="companyType" class="${errors.type ? "field-error" : ""}">
          <option value="Head" ${draft.type === "Head" ? "selected" : ""}>否</option>
          <option value="Branch" ${draft.type === "Branch" ? "selected" : ""}>是</option>
        </select>
        <span class="field-message">${escapeHtml(errors.type || "")}</span>
      </label>
      ${parentField}
      <label class="field"><span>备注</span><textarea id="companyRemark" placeholder="请输入备注（选填）">${escapeHtml(draft.remark || "")}</textarea></label>
    `
    : `
      <label class="field required"><span>统一社会信用代码</span><input id="companyUSCC" class="${errors.USCC ? "field-error" : ""}" value="${escapeHtml(draft.licenses.USCC || "")}" placeholder="请输入统一社会信用代码" /><span class="field-message">${escapeHtml(errors.USCC || "")}</span></label>
      <label class="field required"><span>公司名称</span><input id="companyLegalName" class="${errors.legalName ? "field-error" : ""}" value="${escapeHtml(draft.legalName)}" placeholder="请输入公司名称" /><span class="field-message">${escapeHtml(errors.legalName || "")}</span></label>
      <label class="field required"><span>是否为分公司</span>
        <select id="companyType" class="${errors.type ? "field-error" : ""}">
          <option value="Head" ${draft.type === "Head" ? "selected" : ""}>否</option>
          <option value="Branch" ${draft.type === "Branch" ? "selected" : ""}>是</option>
        </select>
        <span class="field-message">${escapeHtml(errors.type || "")}</span>
      </label>
      ${parentField}
      <label class="field"><span>备注</span><textarea id="companyRemark" placeholder="请输入备注（选填）">${escapeHtml(draft.remark || "")}</textarea></label>
    `;
  const malaysiaFields = `
    <label class="field required"><span>公司类型</span>
      <select id="companyType" class="${errors.type ? "field-error" : ""}">
        <option value="Head" ${draft.type === "Head" ? "selected" : ""}>总公司</option>
        <option value="Branch" ${draft.type === "Branch" ? "selected" : ""}>分公司</option>
      </select>
      <span class="field-message">${escapeHtml(errors.type || "")}</span>
    </label>
    ${parentField}
    <label class="field required"><span>公司名称</span><input id="companyLegalName" class="${errors.legalName ? "field-error" : ""}" value="${escapeHtml(draft.legalName)}" placeholder="请输入公司法定名称" /><span class="field-message">${escapeHtml(errors.legalName || "")}</span></label>
    <label class="field ${malaysiaRequired}"><span>注册地址</span><input id="companyAddress" class="${errors.address ? "field-error" : ""}" value="${escapeHtml(draft.address)}" placeholder="请输入注册地址" /><span class="field-message">${escapeHtml(errors.address || "")}</span></label>
    <label class="field ${malaysiaRequired}"><span>联系电话</span><input id="companyPhone" class="${errors.phone ? "field-error" : ""}" value="${escapeHtml(draft.phone)}" placeholder="请输入联系电话" /><span class="field-message">${escapeHtml(errors.phone || "")}</span></label>
    <label class="field"><span>联系邮箱</span><input id="companyEmail" value="${escapeHtml(draft.email)}" placeholder="请输入联系邮箱" /></label>
    ${renderIndustryFields({ prefix: "company", record: draft, error: errors.industry })}
    <label class="field ${malaysiaRequired}"><span>经营业务说明</span><input id="companyBusinessDesc" class="${errors.businessDesc ? "field-error" : ""}" value="${escapeHtml(draft.businessDesc)}" placeholder="请输入经营业务说明" /><span class="field-message">${escapeHtml(errors.businessDesc || "")}</span></label>
    <label class="field required"><span>商业注册号码（BRN）</span><input id="companyBRN" class="${errors.BRN ? "field-error" : ""}" value="${escapeHtml(draft.licenses.BRN || "")}" placeholder="请输入商业注册号码（BRN）" /><span class="field-message">${escapeHtml(errors.BRN || "")}</span></label>
    <label class="field"><span>税务识别号码（TIN）</span><input id="companyTIN" class="${errors.TIN ? "field-error" : ""}" value="${escapeHtml(draft.licenses.TIN || "")}" placeholder="请输入税务识别号码（TIN）" /><span class="field-message">${escapeHtml(errors.TIN || "")}</span></label>
    <label class="field"><span>销售与服务税注册号码（SST）</span><input id="companySST" class="${errors.SST ? "field-error" : ""}" value="${escapeHtml(draft.licenses.SST || "")}" placeholder="请输入销售与服务税注册号码（SST）" /><span class="field-message">${escapeHtml(errors.SST || "")}</span></label>
  `;
  const localizedFields = draft.country ? (draft.country === "MY" ? malaysiaFields : chinaFields) : "";
  const countryField = isEdit
    ? `<div class="company-country-context"><span>国家/地区</span><strong>${countries[draft.country]}</strong></div>`
    : `
      <label class="field required company-country-field"><span>国家/地区</span>
        <select id="companyCountry" class="${errors.country ? "field-error" : ""}">
          <option value="">请选择国家/地区</option>
          <option value="CN" ${draft.country === "CN" ? "selected" : ""}>中国</option>
          <option value="MY" ${draft.country === "MY" ? "selected" : ""}>马来西亚</option>
        </select>
        <span class="field-message">${escapeHtml(errors.country || "")}</span>
      </label>
    `;
  openModal({
    title: isEdit ? "编辑公司主档" : "创建公司",
    drawer: true,
    body: `
      ${countryField}
      <div class="form-grid">
        ${localizedFields}
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-company">保存</button>`,
  });
}

function hasDuplicateLicense(draft, type, value) {
  if (!value) return false;
  return state.customers.some((customer) =>
    customer.companies.some((company) => company.id !== draft.id && company.country === draft.country && company.licenses[type] === value),
  );
}

function saveCompany() {
  readCompanyDraftFromForm();
  const draft = state.companyDraft;
  const errors = {};
  const customer = currentCustomer();
  const existing = customer.companies.find((company) => company.id === draft.id);
  const childCompanies = customer.companies.filter((company) => company.parentCompanyId === draft.id);
  if (!draft.country) {
    state.companyErrors = { country: "请选择国家/地区" };
    renderCompanyEditor();
    return;
  }
  if (!draft.legalName) errors.legalName = "请填写公司名称";
  if (draft.type === "Branch") {
    const parent = customer.companies.find((company) => company.id === draft.parentCompanyId);
    if (!parent) errors.parentCompanyId = "请选择上级公司";
    else if ((parent.type || "Head") !== "Head" || parent.country !== draft.country) errors.parentCompanyId = "上级公司必须是同国家/地区的总公司";
    if (childCompanies.length) errors.type = "该公司仍有关联分公司，不能改为分公司";
  } else {
    draft.parentCompanyId = "";
  }
  if (draft.country === "MY") {
    if (!draft.industryLevelTwoCode) errors.industry = "请选择二级行业";
    if (!draft.address) errors.address = "请填写注册地址";
    if (!draft.phone) errors.phone = "请填写联系电话";
    if (!draft.businessDesc) errors.businessDesc = "请填写经营业务说明";
    if (!draft.licenses.BRN) errors.BRN = "创建马来西亚公司时 BRN 必填";
    if (hasDuplicateLicense(draft, "BRN", draft.licenses.BRN)) errors.BRN = "该 BRN 已被其他公司使用";
    if (hasDuplicateLicense(draft, "TIN", draft.licenses.TIN)) errors.TIN = "该 TIN 已被其他公司使用";
    if (hasDuplicateLicense(draft, "SST", draft.licenses.SST)) errors.SST = "该 SST 已被其他公司使用";
  } else {
    if (!draft.licenses.USCC) errors.USCC = "请填写统一社会信用代码";
    if (hasDuplicateLicense(draft, "USCC", draft.licenses.USCC)) errors.USCC = "该统一社会信用代码已被其他公司使用";
  }
  if (Object.keys(errors).length) {
    state.companyErrors = errors;
    renderCompanyEditor();
    return;
  }
  if (existing) {
    Object.assign(existing, structuredClone(draft));
  } else {
    draft.id = uid(draft.country === "MY" ? "CO-MY" : "CO-CN");
    draft.createdAt = nowText();
    customer.companies.unshift(structuredClone(draft));
  }
  closeModal();
  render();
  showToast(existing ? "公司主档已更新" : "公司创建成功");
}

function missingMalaysiaLicenses(company) {
  const labels = {
    BRN: "商业注册号码（BRN）",
    TIN: "税务识别号码（TIN）",
    SST: "销售与服务税注册号码（SST）",
  };
  return Object.entries(labels)
    .filter(([key]) => !company?.licenses?.[key]?.trim())
    .map(([key, label]) => ({ key, label }));
}

function renderCompanyInvoiceOpenError() {
  if (!state.companyInvoiceOpenError) return "";
  let action = "";
  if (state.companyInvoiceOpenError === "customer-product") {
    action = `<button class="button link" type="button" data-action="go-product-feature-from-company-open">前往产品功能</button>`;
  }
  if (state.companyInvoiceOpenError === "licenses") {
    action = `<button class="button link" type="button" data-action="edit-current-company">编辑公司信息</button>`;
  }
  const messages = {
    product: "请选择需要开通的发票产品。",
    "customer-product": "客户维度的电子发票产品尚未开通，请先完成客户级产品开通。",
    "industry-mapping": "所属行业尚未配置马来西亚行业映射，请联系运营人员处理。",
    licenses: `公司信息不完整，请先补充：${state.companyInvoiceMissingLicenses.map((item) => item.label).join("、")}。`,
  };
  return `<div class="notice warning company-open-error"><span>${messages[state.companyInvoiceOpenError]}</span>${action}</div>`;
}

function renderCompanyInvoiceOpenDrawer() {
  const company = currentCompany();
  if (!company || company.country !== "MY") return;
  const alreadyOpened = company.invoiceStatus === "opened";
  const step = state.companyInvoiceOpenStep;
  const title = step === 1 ? "开通功能" : "开通发票功能";
  const body =
    step === 1
      ? `
        <section class="company-open-section">
          <h3>公司信息</h3>
          <dl class="company-open-summary company-open-summary-single">
            <div><dt>公司名称</dt><dd>${escapeHtml(company.legalName)}</dd></div>
            <div><dt>商业注册号码（BRN）</dt><dd>${escapeHtml(company.licenses.BRN || "-")}</dd></div>
          </dl>
        </section>
        <section class="company-open-section">
          <h3>功能列表</h3>
          <label class="company-open-product ${alreadyOpened ? "is-opened" : ""}">
            <input id="companyInvoiceProductSelected" type="checkbox" ${alreadyOpened ? "disabled" : state.companyInvoiceProductSelected ? "checked" : ""} />
            <span class="company-function-icon"><img src="./assets/receipt-text.svg" alt="" /></span>
            <span class="company-function-copy"><strong>发票</strong><small>${alreadyOpened ? "发票功能已开通，无需重复开通" : "为该公司开通马来西亚电子发票功能"}</small></span>
            <span class="tag ${alreadyOpened ? "success" : ""}">${alreadyOpened ? "已开通" : "未开通"}</span>
          </label>
        </section>
        ${renderCompanyInvoiceOpenError()}
      `
      : `
        <section class="company-open-section">
          <h3>公司及证照信息</h3>
          <dl class="review-list company-open-review">
            <div><dt>公司名称</dt><dd>${escapeHtml(company.legalName)}</dd></div>
            <div><dt>商业注册号码（BRN）</dt><dd>${escapeHtml(company.licenses.BRN)}</dd></div>
            <div><dt>税务识别号码（TIN）</dt><dd>${escapeHtml(company.licenses.TIN)}</dd></div>
            <div><dt>销售与服务税注册号码（SST）</dt><dd>${escapeHtml(company.licenses.SST)}</dd></div>
          </dl>
        </section>
        <section class="company-open-section company-open-authorization">
          <h3>税局授权提示</h3>
          <div class="notice warning">
            <span>企业需要先在马来西亚税局系统中完成发票中介机构授权</span>
          </div>
          <dl class="company-open-summary">
            <div><dt>中介机构名称</dt><dd>待补充</dd></div>
            <div><dt>中介机构编号</dt><dd>待补充</dd></div>
          </dl>
        </section>
      `;
  const actions =
    step === 1
      ? `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="next-company-invoice-open" ${alreadyOpened ? "disabled" : ""}>下一步</button>`
      : `<button class="button" type="button" data-action="prev-company-invoice-open">上一步</button><span class="modal-foot-spacer"></span><button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="confirm-company-open">确认开通</button>`;
  state.modalContext = "company-invoice-open";
  openModal({
    title,
    body,
    actions,
    drawer: true,
    className: "company-invoice-open-drawer",
  });
}

function openCompanyInvoice() {
  const company = currentCompany();
  if (!company || company.country !== "MY") return;
  state.companyInvoiceOpenStep = 1;
  state.companyInvoiceProductSelected = company.invoiceStatus !== "opened";
  state.companyInvoiceOpenError = "";
  state.companyInvoiceMissingLicenses = [];
  renderCompanyInvoiceOpenDrawer();
}

function nextCompanyInvoiceOpen() {
  const customer = currentCustomer();
  const company = currentCompany();
  if (company?.invoiceStatus === "opened") return;
  const selected = document.getElementById("companyInvoiceProductSelected");
  state.companyInvoiceProductSelected = Boolean(selected?.checked);
  state.companyInvoiceOpenError = "";
  state.companyInvoiceMissingLicenses = [];

  if (!state.companyInvoiceProductSelected) {
    state.companyInvoiceOpenError = "product";
  } else if (!customer.productOpen) {
    state.companyInvoiceOpenError = "customer-product";
  } else if (!malaysiaIndustryMapping(company)) {
    state.companyInvoiceOpenError = "industry-mapping";
  } else {
    state.companyInvoiceMissingLicenses = missingMalaysiaLicenses(company);
    if (state.companyInvoiceMissingLicenses.length) state.companyInvoiceOpenError = "licenses";
  }
  if (state.companyInvoiceOpenError) {
    renderCompanyInvoiceOpenDrawer();
    return;
  }
  state.companyInvoiceOpenStep = 2;
  renderCompanyInvoiceOpenDrawer();
}

function openCompanyInvoiceFromList(companyId) {
  state.currentCompanyId = companyId;
  const company = currentCompany();
  if (!company || company.country !== "MY") return;
  openCompanyInvoice();
}

function confirmCompanyOpen() {
  const customer = currentCustomer();
  const company = currentCompany();
  if (!company || company.country !== "MY") return;
  const missing = missingMalaysiaLicenses(company);
  const mapping = malaysiaIndustryMapping(company);
  if (!customer.productOpen || !mapping || missing.length) {
    state.companyInvoiceOpenStep = 1;
    state.companyInvoiceOpenError = !customer.productOpen ? "customer-product" : !mapping ? "industry-mapping" : "licenses";
    state.companyInvoiceMissingLicenses = missing;
    renderCompanyInvoiceOpenDrawer();
    return;
  }
  company.invoiceStatus = "opened";
  company.taxpayerExists = true;
  company.openAttempted = true;
  company.openedAt = nowText();
  closeModal();
  render();
  showToast("公司发票功能已开通");
}

function openBrandEditor(brandId = "") {
  const existing = currentCustomer().brands.find((brand) => brand.id === brandId);
  const brand = existing || {
    id: "",
    country: "",
    name: "",
    industryLevelOneCode: "",
    industryLevelOneName: "",
    industryLevelTwoCode: "",
    industryLevelTwoName: "",
    description: "",
    standardLogo: "",
    horizontalLogo: "",
  };
  state.modalContext = { type: "brand-editor", id: brandId };
  openModal({
    title: existing ? "编辑品牌" : "创建品牌",
    drawer: true,
    body: `
      <div class="form-grid">
        <label class="field required"><span>品牌名称</span><input id="brandName" value="${escapeHtml(brand.name)}" placeholder="请输入品牌名称" /></label>
        <label class="field required"><span>经营国家/地区</span>
          <select id="brandCountry" ${existing ? "disabled" : ""}>
            <option value="">请选择经营国家/地区</option>
            <option value="CN" ${brand.country === "CN" ? "selected" : ""}>中国</option>
            <option value="MY" ${brand.country === "MY" ? "selected" : ""}>马来西亚</option>
          </select>
          ${existing ? `<small>品牌创建后不可直接变更经营国家/地区</small>` : ""}
        </label>
        ${renderIndustryFields({ prefix: "brand", record: brand })}
        ${
          existing
            ? ""
            : `
              ${brandUploadField({ id: "brandStandardLogo", label: "品牌标准logo", value: brand.standardLogo, horizontal: false })}
              ${brandUploadField({ id: "brandHorizontalLogo", label: "品牌横版logo", value: brand.horizontalLogo, horizontal: true })}
            `
        }
        <label class="field full"><span>品牌描述</span><textarea id="brandDescription" placeholder="请输入品牌描述">${escapeHtml(brand.description)}</textarea></label>
        <div class="field-message full" id="brandError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-brand">保存</button>`,
  });
}

function brandUploadField({ id, label, value, horizontal }) {
  return `
    <div class="field required brand-upload-field">
      <span>${escapeHtml(label)}</span>
      <label class="legacy-upload-box ${horizontal ? "horizontal" : ""}" for="${id}">
        <span class="upload-plus">＋</span>
        <span>${value ? "重新上传" : "上传照片"}</span>
      </label>
      <input class="hidden" id="${id}" type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" />
      <small>${horizontal ? "图片格式必须为：png，jpg；不可大于4M；宽高建议：320px*64px" : "图片格式必须为：png，jpg；不可大于4M；宽高比例：1:1"}</small>
      <div class="legacy-upload-name" id="${id}Name">${escapeHtml(value || "")}</div>
    </div>
  `;
}

function saveBrand() {
  const name = document.getElementById("brandName").value.trim();
  const country = document.getElementById("brandCountry").value;
  const existing = currentCustomer().brands.find((brand) => brand.id === state.modalContext.id);
  const standardLogoInput = document.getElementById("brandStandardLogo");
  const horizontalLogoInput = document.getElementById("brandHorizontalLogo");
  const standardLogo = standardLogoInput?.files?.[0]?.name || existing?.standardLogo || "";
  const horizontalLogo = horizontalLogoInput?.files?.[0]?.name || existing?.horizontalLogo || "";
  const selectedIndustry = {};
  readIndustrySelectionFromForm(selectedIndustry, "brand");
  const description = document.getElementById("brandDescription").value.trim();
  if (!name || !country || !selectedIndustry.industryLevelTwoCode || !standardLogo || !horizontalLogo) {
    document.getElementById("brandError").textContent = "请填写品牌名称、经营国家/地区、所属行业，并上传品牌标准 Logo 和品牌横版 Logo";
    return;
  }
  if (existing) {
    Object.assign(existing, {
      name,
      country: existing.country,
      ...selectedIndustry,
      description,
      logoText: name.slice(0, 2).toUpperCase(),
      logoHorizontalText: name.toUpperCase(),
    });
    closeModal();
    render();
    showToast("品牌信息已更新");
    return;
  }
  const brand = {
    id: uid(country === "MY" ? "BR-MY" : "BR-CN"),
    country,
    name,
    shortName: name,
    ...selectedIndustry,
    description,
    standardLogo,
    horizontalLogo,
    createdAt: nowText(),
    logoText: name.slice(0, 2).toUpperCase(),
    logoHorizontalText: name.toUpperCase(),
    stores: [],
    config: {
      itemNameSource: "order-item",
      rules: [],
      fallbacks: [],
      payments: [],
      application: {
        qrDays: "30",
        selfReissueEnabled: true,
        selfReissueMaxCount: "2",
        selfReissueValidDays: "180",
        pageStyle: "经典",
        theme: "black-gold",
        note: "请核对订单信息并填写买方资料。",
      },
    },
  };
  ensureBrandLogoSets(brand);
  currentCustomer().brands.unshift(brand);
  closeModal();
  render();
  showToast("品牌创建成功");
}

function openBrandLogoSchemeEditor(schemeId = "") {
  const brand = currentBrand();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const existing = logoSets.find((scheme) => scheme.id === schemeId);
  if (!existing && logoSets.length >= BRAND_LOGO_SET_LIMIT) {
    showToast(`每个品牌最多设置 ${BRAND_LOGO_SET_LIMIT} 组 Logo 方案`);
    return;
  }
  state.brandLogoSchemeDraft = existing
    ? structuredClone(existing)
    : {
        id: "",
        name: "",
        standardLogo: "",
        horizontalLogo: "",
        isDefault: false,
        createdAt: "",
      };
  state.brandLogoSchemeFileError = "";
  state.modalContext = { type: "brand-logo-scheme-editor", id: schemeId };
  openModal({
    title: existing ? "编辑 Logo 方案" : "添加 Logo 方案",
    drawer: true,
    body: `
      <div class="form-grid">
        <label class="field required"><span>方案名称</span><input id="brandLogoSchemeName" value="${escapeHtml(state.brandLogoSchemeDraft.name)}" placeholder="请输入方案名称" /></label>
        ${brandUploadField({ id: "brandLogoSchemeStandard", label: "品牌标准 Logo", value: state.brandLogoSchemeDraft.standardLogo, horizontal: false })}
        ${brandUploadField({ id: "brandLogoSchemeHorizontal", label: "品牌横版 Logo", value: state.brandLogoSchemeDraft.horizontalLogo, horizontal: true })}
        <div class="field-message full" id="brandLogoError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-brand-logo-scheme">保存</button>`,
  });
}

function brandLogoFileError(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const validType = ["png", "jpg", "jpeg"].includes(extension) && ["image/png", "image/jpeg"].includes(file.type);
  if (!validType) return "Logo 仅支持 png、jpg 格式";
  if (file.size > 4 * 1024 * 1024) return "Logo 文件不能大于 4M";
  return "";
}

function handleBrandLogoSchemeFile(input) {
  const file = input.files?.[0];
  if (!file || !state.brandLogoSchemeDraft) return;
  const error = brandLogoFileError(file);
  const errorNode = document.getElementById("brandLogoError");
  if (error) {
    state.brandLogoSchemeFileError = error;
    input.value = "";
    if (errorNode) errorNode.textContent = error;
    return;
  }
  const key = input.id === "brandLogoSchemeStandard" ? "standardLogo" : "horizontalLogo";
  state.brandLogoSchemeDraft[key] = file.name;
  state.brandLogoSchemeFileError = "";
  const name = document.getElementById(`${input.id}Name`);
  if (name) name.textContent = file.name;
  if (errorNode) errorNode.textContent = "";
}

function saveBrandLogoScheme() {
  const brand = currentBrand();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const existing = logoSets.find((scheme) => scheme.id === state.modalContext?.id);
  const name = document.getElementById("brandLogoSchemeName")?.value.trim() || "";
  const draft = state.brandLogoSchemeDraft || {};
  const duplicate = logoSets.some((scheme) => scheme.id !== existing?.id && scheme.name.trim().toLowerCase() === name.toLowerCase());
  const errorNode = document.getElementById("brandLogoError");
  if (state.brandLogoSchemeFileError) {
    errorNode.textContent = state.brandLogoSchemeFileError;
    return;
  }
  if (!name || !draft.standardLogo || !draft.horizontalLogo) {
    errorNode.textContent = "请填写方案名称，并上传品牌标准 Logo 和品牌横版 Logo";
    return;
  }
  if (duplicate) {
    errorNode.textContent = "方案名称不能重复";
    return;
  }
  if (!existing && logoSets.length >= BRAND_LOGO_SET_LIMIT) {
    errorNode.textContent = `每个品牌最多设置 ${BRAND_LOGO_SET_LIMIT} 组 Logo 方案`;
    return;
  }
  if (existing) {
    Object.assign(existing, {
      name,
      standardLogo: draft.standardLogo,
      horizontalLogo: draft.horizontalLogo,
    });
    if (existing.isDefault) {
      brand.standardLogo = existing.standardLogo;
      brand.horizontalLogo = existing.horizontalLogo;
    }
  } else {
    logoSets.push({
      id: uid(`${brand.id}-LOGO`),
      name,
      standardLogo: draft.standardLogo,
      horizontalLogo: draft.horizontalLogo,
      isDefault: false,
      createdAt: nowText(),
    });
  }
  closeModal();
  render();
  showToast(existing ? "Logo 方案已更新" : "Logo 方案已添加");
}

function deleteBrandLogoScheme(schemeId) {
  const brand = currentBrand();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const scheme = logoSets.find((item) => item.id === schemeId);
  if (!scheme) return;
  if (scheme.isDefault) {
    showToast("默认 Logo 方案不可删除");
    return;
  }
  if (!window.confirm(`确定删除 Logo 方案“${scheme.name}”吗？`)) return;
  brand.logoSets = logoSets.filter((item) => item.id !== schemeId);
  render();
  showToast("Logo 方案已删除");
}

function openStoreEditor(storeId = "") {
  const brand = currentBrand();
  const store = brand.stores.find((item) => item.id === storeId);
  state.modalContext = "store-editor";
  state.storeDraft = store
    ? structuredClone(store)
    : {
        id: "",
        name: "",
        storeNo: "",
        createdAt: "",
        enabled: true,
        countryCode: brand.country,
        regionLevel1Code: "",
        regionLevel1Name: "",
        regionLevel2Code: "",
        regionLevel2Name: "",
        regionLevel3Code: "",
        regionLevel3Name: "",
        regionPath: "",
        city: "",
        address: "",
        phone: "",
        remark: "",
        companyId: "",
        associationStatus: "unassociated",
        invoiceEnabled: false,
      };
  openModal({
    title: store ? "编辑门店" : "创建门店",
    drawer: true,
    className: "store-editor-drawer",
    body: `
      <div class="form-grid">
        <div class="company-country-context"><span>品牌经营国家/地区</span><strong>${escapeHtml(countries[brand.country] || "-")}</strong></div>
        <label class="field required"><span>门店名称</span><input id="storeName" value="${escapeHtml(state.storeDraft.name)}" placeholder="请输入门店名称" /></label>
        <label class="field required"><span>门店号</span><input id="storeNo" value="${escapeHtml(state.storeDraft.storeNo)}" placeholder="请输入门店号" /></label>
        <div class="field required">
          <span>所属地区</span>
          ${renderStoreRegionCascader(state.storeDraft, brand.country)}
          <span class="field-message" id="storeRegionError"></span>
        </div>
        <label class="field required full"><span>详细地址</span><textarea id="storeAddress" placeholder="请填写详细地址">${escapeHtml(state.storeDraft.address)}</textarea></label>
        <label class="field"><span>联系电话</span><input id="storePhone" value="${escapeHtml(state.storeDraft.phone || "")}" placeholder="请输入联系电话" /></label>
        <label class="field full"><span>备注</span><textarea id="storeRemark" placeholder="请填写备注">${escapeHtml(state.storeDraft.remark || "")}</textarea></label>
        <div class="field-message full" id="storeError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-store">保存</button>`,
  });
}

function saveStore() {
  const draft = state.storeDraft;
  draft.name = document.getElementById("storeName").value.trim();
  draft.storeNo = document.getElementById("storeNo").value.trim();
  const countryCode = currentBrand().country;
  const levelOneCode = document.getElementById("storeRegionLevelOne").value;
  const levelTwoCode = document.getElementById("storeRegionLevelTwo").value;
  const levelThreeCode = document.getElementById("storeRegionLevelThree").value;
  const levelOne = storeRegionLevelOne(countryCode, levelOneCode);
  const levelTwo = levelOne?.skipLevelTwo ? null : storeRegionLevelTwo(countryCode, levelOneCode, levelTwoCode);
  const levelThree = storeRegionLevelThree(countryCode, levelOneCode, levelTwoCode, levelThreeCode);
  draft.countryCode = countryCode;
  draft.regionLevel1Code = levelOne?.code || "";
  draft.regionLevel1Name = levelOne?.name || "";
  draft.regionLevel2Code = levelTwo?.code || "";
  draft.regionLevel2Name = levelTwo?.name || "";
  draft.regionLevel3Code = levelThree?.code || "";
  draft.regionLevel3Name = levelThree?.name || "";
  draft.regionPath = [draft.regionLevel1Name, draft.regionLevel2Name, draft.regionLevel3Name].filter(Boolean).join(" / ");
  draft.city = draft.regionLevel3Name;
  draft.address = document.getElementById("storeAddress").value.trim();
  draft.phone = document.getElementById("storePhone").value.trim();
  draft.remark = document.getElementById("storeRemark").value.trim();
  if (!draft.name || !draft.storeNo || !draft.regionLevel1Code || !draft.regionLevel3Code || !draft.address) {
    document.getElementById("storeError").textContent = "请填写门店名称、门店号、所属地区和详细地址";
    if (!draft.regionLevel1Code || !draft.regionLevel3Code) {
      document.querySelector(".store-region-cascader-trigger")?.classList.add("field-error");
      document.getElementById("storeRegionError").textContent = "请选择完整的所属地区";
    }
    return;
  }
  const brand = currentBrand();
  const duplicate = brand.stores.find(
    (store) => store.id !== draft.id && store.storeNo.toLowerCase() === draft.storeNo.toLowerCase(),
  );
  if (duplicate) {
    document.getElementById("storeError").textContent = "当前品牌下已存在相同门店号";
    return;
  }
  const existing = brand.stores.find((store) => store.id === draft.id);
  if (existing) {
    Object.assign(existing, structuredClone(draft));
  } else {
    draft.id = uid("ST");
    draft.createdAt = nowText();
    draft.enabled = true;
    brand.stores.unshift(structuredClone(draft));
  }
  closeModal();
  render();
  showToast(existing ? "门店信息已更新" : "门店创建成功");
}

function openStoreDetail(storeId) {
  const customer = currentCustomer();
  const brand = currentBrand();
  const store = brand?.stores.find((item) => item.id === storeId);
  if (!brand || !store) return;
  state.modalContext = { type: "store-detail", id: store.id };
  openModal({
    title: "门店详情",
    drawer: true,
    body: `
      <dl class="info-grid store-detail-grid">
        <div><dt>门店名称</dt><dd>${escapeHtml(store.name)}</dd></div>
        <div><dt>门店 ID</dt><dd>${escapeHtml(store.id)}</dd></div>
        <div><dt>门店号</dt><dd>${escapeHtml(store.storeNo)}</dd></div>
        <div><dt>所属品牌</dt><dd>${escapeHtml(brand.name)}</dd></div>
        <div><dt>经营国家/地区</dt><dd>${escapeHtml(countries[brand.country] || "-")}</dd></div>
        <div><dt>状态</dt><dd><span class="tag ${store.enabled === false ? "" : "success"}">${store.enabled === false ? "停用" : "正常"}</span></dd></div>
        <div><dt>所属地区</dt><dd>${escapeHtml(storeRegionPath(store) || "-")}</dd></div>
        <div><dt>详细地址</dt><dd>${escapeHtml(store.address || "-")}</dd></div>
        <div><dt>联系电话</dt><dd>${escapeHtml(store.phone || "-")}</dd></div>
        <div><dt>备注</dt><dd>${escapeHtml(store.remark || "-")}</dd></div>
        <div><dt>关联公司</dt><dd>${escapeHtml(companyName(customer, store.companyId))}</dd></div>
        <div><dt>创建时间</dt><dd>${escapeHtml(store.createdAt || "-")}</dd></div>
      </dl>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">关闭</button><button class="button primary" type="button" data-action="edit-store-from-detail" data-id="${store.id}">编辑</button>`,
  });
}

function openBrandStoreImport() {
  const brand = currentBrand();
  if (!brand || brand.country !== "CN") return;
  state.modalContext = { type: "brand-store-import", id: brand.id };
  openModal({
    title: "导入门店",
    drawer: true,
    body: `
      <div class="legacy-drawer-section">
        <h3>导入范围</h3>
        <dl class="company-open-summary company-open-summary-single">
          <div><dt>品牌名称</dt><dd>${escapeHtml(brand.name)}</dd></div>
          <div><dt>经营国家/地区</dt><dd>中国</dd></div>
        </dl>
      </div>
      <div class="legacy-drawer-section">
        <h3>上传文件</h3>
        <p class="muted import-store-description">请使用门店导入模板填写门店名称、门店号、城市和详细地址。</p>
        <button class="button" type="button" data-action="download-store-template">下载导入模板</button>
        <label class="brand-store-import-box" for="brandStoreImportFile">
          <strong>选择 Excel 文件</strong>
          <span>支持 .xlsx、.xls 文件</span>
        </label>
        <input class="hidden" id="brandStoreImportFile" type="file" accept=".xlsx,.xls" />
        <div class="legacy-upload-name" id="brandStoreImportFileName"></div>
        <div class="field-message" id="brandStoreImportError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="confirm-brand-store-import">确认导入</button>`,
  });
}

function confirmBrandStoreImport() {
  const brand = currentBrand();
  const file = document.getElementById("brandStoreImportFile")?.files?.[0];
  if (!brand || brand.country !== "CN") return;
  if (!file) {
    document.getElementById("brandStoreImportError").textContent = "请选择需要导入的 Excel 文件";
    return;
  }
  brand.stores.unshift({
    id: uid("ST-CN"),
    name: "批量导入示例门店",
    storeNo: `IMPORT-${String(Date.now()).slice(-4)}`,
    createdAt: nowText(),
    enabled: true,
    countryCode: "CN",
    regionLevel1Code: "CN-31",
    regionLevel1Name: "上海市",
    regionLevel2Code: "CN-31-01",
    regionLevel2Name: "上海市",
    regionLevel3Code: "CN-31-PD",
    regionLevel3Name: "浦东新区",
    regionPath: "上海市 / 上海市 / 浦东新区",
    city: "上海市",
    address: "上海市示例地址",
    phone: "",
    remark: "门店导入示例数据",
    companyId: "",
    associationStatus: "unassociated",
    invoiceEnabled: false,
  });
  closeModal();
  render();
  showToast("门店导入完成");
}

function ruleSelectOptions(options, selectedValue) {
  return options
    .map((option) => `<option value="${escapeHtml(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function activeClassificationCatalog() {
  return currentBrand()?.country === "MY" ? malaysiaClassificationCatalog : chinaTaxClassificationCatalog;
}

function classificationDisplayName(item) {
  return item?.name || item?.shortName || "";
}

function renderRuleTaxCodeSuggestions(keyword = "") {
  const suggestions = document.getElementById("ruleTaxCodeSuggestions");
  if (!suggestions) return;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const matches = activeClassificationCatalog().filter(
    (item) =>
      !normalizedKeyword ||
      item.code.includes(normalizedKeyword) ||
      classificationDisplayName(item).toLowerCase().includes(normalizedKeyword) ||
      (item.description || "").toLowerCase().includes(normalizedKeyword),
  );
  suggestions.innerHTML = matches.length
    ? matches
        .map(
          (item) => `
            <button type="button" data-action="select-rule-tax-code" data-code="${item.code}">
              <strong>${item.code}</strong>
              <span>${escapeHtml(classificationDisplayName(item))}${item.description ? ` · ${escapeHtml(item.description)}` : ""}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="tax-code-suggestion-empty">未找到匹配的商品分类编码</div>`;
}

function setRuleTaxClassification(code) {
  const classification = document.getElementById("ruleClassification");
  const shortName = document.getElementById("ruleTaxShortName");
  if (!classification || !shortName) return;
  const match = activeClassificationCatalog().find((item) => item.code === code.trim());
  classification.value = code.trim();
  shortName.value = classificationDisplayName(match);
}

function eligibleFallbackTaxpayers() {
  const customer = currentCustomer();
  const brand = currentBrand();
  if (!customer || !brand) return [];
  return customer.companies.filter(
    (company) =>
      company.country === brand.country &&
      company.invoiceStatus === "opened" &&
      company.taxpayerExists &&
      Boolean(company.licenses.USCC || company.licenses.TIN),
  );
}

function companyTaxNumber(company) {
  return company?.licenses?.USCC || company?.licenses?.TIN || "";
}

function renderFallbackTaxpayerSuggestions(keyword = "") {
  const suggestions = document.getElementById("fallbackTaxpayerSuggestions");
  if (!suggestions) return;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const matches = eligibleFallbackTaxpayers().filter((company) => {
    const taxNumber = companyTaxNumber(company).toLowerCase();
    return !normalizedKeyword || taxNumber.includes(normalizedKeyword) || company.legalName.toLowerCase().includes(normalizedKeyword);
  });
  suggestions.innerHTML = matches.length
    ? matches
        .map(
          (company) => `
            <button type="button" data-action="select-fallback-taxpayer" data-id="${company.id}">
              <strong>${escapeHtml(companyTaxNumber(company))}</strong>
              <span>${escapeHtml(company.legalName)}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="tax-code-suggestion-empty">暂无可选的已开通税号</div>`;
}

function setFallbackTaxpayer(companyId) {
  const company = eligibleFallbackTaxpayers().find((item) => item.id === companyId);
  const companyInput = document.getElementById("fallbackCompany");
  const taxNumberInput = document.getElementById("fallbackTaxNo");
  const taxpayerNameInput = document.getElementById("fallbackTaxpayerName");
  if (!companyInput || !taxNumberInput || !taxpayerNameInput) return;
  companyInput.value = company?.id || "";
  taxNumberInput.value = companyTaxNumber(company);
  taxpayerNameInput.value = company?.legalName || "";
}

function syncFallbackTaxpayerFromInput(value) {
  const normalizedValue = value.trim().toLowerCase();
  const company = eligibleFallbackTaxpayers().find(
    (item) => companyTaxNumber(item).toLowerCase() === normalizedValue,
  );
  const companyInput = document.getElementById("fallbackCompany");
  const taxpayerNameInput = document.getElementById("fallbackTaxpayerName");
  if (!companyInput || !taxpayerNameInput) return;
  companyInput.value = company?.id || "";
  taxpayerNameInput.value = company?.legalName || "";
}

function renderFallbackTaxCodeSuggestions(keyword = "") {
  const suggestions = document.getElementById("fallbackTaxCodeSuggestions");
  if (!suggestions) return;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const matches = activeClassificationCatalog().filter(
    (item) =>
      !normalizedKeyword ||
      item.code.includes(normalizedKeyword) ||
      classificationDisplayName(item).toLowerCase().includes(normalizedKeyword) ||
      (item.description || "").toLowerCase().includes(normalizedKeyword),
  );
  suggestions.innerHTML = matches.length
    ? matches
        .map(
          (item) => `
            <button type="button" data-action="select-fallback-tax-code" data-code="${item.code}">
              <strong>${item.code}</strong>
              <span>${escapeHtml(classificationDisplayName(item))}${item.description ? ` · ${escapeHtml(item.description)}` : ""}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="tax-code-suggestion-empty">未找到匹配的商品分类编码</div>`;
}

function setFallbackTaxClassification(code) {
  const classification = document.getElementById("fallbackClassification");
  const shortName = document.getElementById("fallbackTaxShortName");
  if (!classification || !shortName) return;
  const match = activeClassificationCatalog().find((item) => item.code === code.trim());
  classification.value = code.trim();
  shortName.value = classificationDisplayName(match);
}

function malaysiaTaxTypeOptions(selectedValue = "01") {
  return malaysiaTaxTypeCatalog
    .map(
      (item) =>
        `<option value="${item.code}" ${item.code === selectedValue ? "selected" : ""}>${item.code} ${escapeHtml(item.name)} / ${escapeHtml(item.description)}</option>`,
    )
    .join("");
}

function malaysiaTaxRateOptions(taxTypeCode = "01", selectedValue = "") {
  const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode) || malaysiaTaxTypeCatalog[0];
  const selected = taxType.rates.includes(selectedValue) ? selectedValue : taxType.rates[0];
  return ruleSelectOptions(taxType.rates, selected);
}

function defaultTaxTypeCode(brand = currentBrand()) {
  return brand?.country === "MY" ? "01" : "VAT";
}

function taxTypeOptionsForBrand(brand = currentBrand(), selectedValue = "") {
  if (brand?.country !== "MY") {
    return `<option value="VAT" selected>增值税</option>`;
  }
  const selected = selectedValue || defaultTaxTypeCode(brand);
  return malaysiaTaxTypeCatalog
    .map(
      (item) =>
        `<option value="${item.code}" ${item.code === selected ? "selected" : ""}>${escapeHtml(item.description)}</option>`,
    )
    .join("");
}

function taxRateOptionsForBrand(brand = currentBrand(), taxTypeCode = "", selectedValue = "") {
  if (brand?.country !== "MY") {
    return ruleSelectOptions(chinaTaxRateOptions, selectedValue || "13%");
  }
  return malaysiaTaxRateOptions(taxTypeCode || defaultTaxTypeCode(brand), selectedValue);
}

function preferentialPolicyOptionsForBrand(brand = currentBrand(), selectedValue = "无") {
  const normalized = selectedValue === "否" ? "无" : selectedValue || "无";
  return ruleSelectOptions(brand?.country === "MY" ? ["无"] : chinaPreferentialPolicyOptions, normalized);
}

function taxTypeNameForBrand(brand, taxTypeCode) {
  if (brand?.country !== "MY") return "增值税";
  return malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode)?.name || "";
}

function isValidTaxTypeRate(brand, taxTypeCode, taxRate) {
  if (brand?.country !== "MY") {
    return taxTypeCode === "VAT" && chinaTaxRateOptions.includes(taxRate);
  }
  const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode);
  return Boolean(taxType?.rates.includes(taxRate));
}

function syncMalaysiaTaxTypeFields(prefix) {
  const brand = currentBrand();
  const taxTypeSelect = document.getElementById(`${prefix}TaxType`);
  const taxRateSelect = document.getElementById(`${prefix}TaxRate`);
  if (!taxTypeSelect || !taxRateSelect) return;
  const previousRate = taxRateSelect.value;
  taxRateSelect.innerHTML = taxRateOptionsForBrand(brand, taxTypeSelect.value, previousRate);
}

function openMalaysiaRuleEditor(ruleId = "") {
  const config = ensureBrandInvoiceConfig(currentBrand());
  const rule = config.rules.find((item) => item.id === ruleId) || {
    id: "",
    category: "",
    alias: "",
    classification: "",
    classificationName: "",
    taxType: "01",
    taxTypeName: "Sales Tax",
    taxRate: "10%",
  };
  state.modalContext = { type: "malaysia-rule-editor", id: ruleId };
  openModal({
    title: ruleId ? "编辑商品开票匹配规则" : "新增商品开票匹配规则",
    drawer: true,
    className: "rule-editor-drawer",
    body: `
      <div class="form-grid">
        <label class="field required"><span>商品大类</span><input id="ruleCategory" value="${escapeHtml(rule.category)}" placeholder="请输入商品大类" /></label>
        <label class="field required"><span>大类别名</span><input id="ruleAlias" value="${escapeHtml(rule.alias)}" placeholder="请输入大类别名" /></label>
        <label class="field required tax-classification-combobox">
          <span>商品分类编码（Classification Code）</span>
          <input id="ruleClassification" value="${escapeHtml(rule.classification)}" placeholder="请输入商品分类编码" autocomplete="off" aria-controls="ruleTaxCodeSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="ruleTaxCodeSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>商品分类名称</span><input id="ruleTaxShortName" value="${escapeHtml(rule.classificationName || "")}" placeholder="按商品分类编码带出" readonly /></label>
        <label class="field required"><span>税种编码（Tax Type）</span><select id="ruleTaxType">${malaysiaTaxTypeOptions(rule.taxType || "01")}</select></label>
        <label class="field required"><span>税种名称</span><input id="ruleTaxTypeName" value="${escapeHtml(rule.taxTypeName || "Sales Tax")}" placeholder="按 Tax Type 带出" readonly /></label>
        <label class="field required"><span>税率（Tax Rate）</span><select id="ruleTaxRate">${malaysiaTaxRateOptions(rule.taxType || "01", rule.taxRate)}</select></label>
        <div class="field-message full" id="ruleError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-rule">确定</button>`,
  });
  renderRuleTaxCodeSuggestions();
}

function saveMalaysiaRule() {
  const classification = document.getElementById("ruleClassification").value.trim();
  const classificationItem = malaysiaClassificationCatalog.find((item) => item.code === classification);
  const taxTypeCode = document.getElementById("ruleTaxType").value;
  const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode);
  const values = {
    category: document.getElementById("ruleCategory").value.trim(),
    alias: document.getElementById("ruleAlias").value.trim(),
    classification,
    classificationName: classificationItem?.name || "",
    taxType: taxTypeCode,
    taxTypeName: taxType?.name || "",
    taxRate: document.getElementById("ruleTaxRate").value,
    updatedAt: nowText(),
  };
  const error = document.getElementById("ruleError");
  if (!values.category || !values.alias || !values.classification || !values.taxType || !values.taxRate) {
    error.textContent = "请完整填写商品大类、大类别名、商品分类、Tax Type 和 Tax Rate";
    return;
  }
  if (!classificationItem) {
    error.textContent = "请选择有效的商品分类编码";
    return;
  }
  if (!taxType || !taxType.rates.includes(values.taxRate)) {
    error.textContent = "请选择当前 Tax Type 对应的 Tax Rate";
    return;
  }
  const config = ensureBrandInvoiceConfig(currentBrand());
  const id = state.modalContext.id;
  const duplicated = config.rules.find(
    (item) => item.category.toLowerCase() === values.category.toLowerCase() && item.id !== id,
  );
  if (duplicated) {
    error.textContent = "当前品牌已存在相同商品大类的规则";
    return;
  }
  const existing = config.rules.find((item) => item.id === id);
  if (existing) Object.assign(existing, values);
  else config.rules.unshift({ id: uid("RULE-MY"), ...values });
  closeModal();
  render();
  showToast(existing ? "商品开票匹配规则已更新" : "商品开票匹配规则已新增");
}

function openRuleEditor(ruleId = "") {
  const brand = currentBrand();
  const config = ensureBrandInvoiceConfig(brand);
  const rule = config.rules.find((item) => item.id === ruleId) || {
    id: "",
    category: "",
    alias: "",
    classification: "",
    taxShortName: "",
    taxType: defaultTaxTypeCode(brand),
    taxRate: brand?.country === "MY" ? "10%" : "13%",
    preferentialPolicy: "无",
    specifiedCompanyId: "",
  };
  const preferentialPolicy = rule.preferentialPolicy === "否" ? "无" : rule.preferentialPolicy || "无";
  const companies = eligibleFallbackTaxpayers();
  const taxTypeCode = rule.taxType || defaultTaxTypeCode(brand);
  state.modalContext = { type: "rule-editor", id: ruleId };
  openModal({
    title: ruleId ? "编辑商品开票规则" : "新增商品开票规则",
    drawer: true,
    className: "rule-editor-drawer",
    body: `
      <div class="form-grid">
        <label class="field required"><span>商品大类</span><input id="ruleCategory" value="${escapeHtml(rule.category)}" placeholder="请输入商品大类" /></label>
        <label class="field required"><span>大类别名</span><input id="ruleAlias" value="${escapeHtml(rule.alias)}" placeholder="请输入大类别名" /></label>
        <label class="field required tax-classification-combobox">
          <span>税收分类编码</span>
          <input id="ruleClassification" value="${escapeHtml(rule.classification)}" placeholder="请输入税收分类编码" autocomplete="off" aria-controls="ruleTaxCodeSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="ruleTaxCodeSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>税收分类简称</span><input id="ruleTaxShortName" value="${escapeHtml(rule.taxShortName || rule.classificationName || "")}" placeholder="按税收分类编码带出" readonly /></label>
        <label class="field required"><span>税种</span><select id="ruleTaxType">${taxTypeOptionsForBrand(brand, taxTypeCode)}</select></label>
        <label class="field required"><span>税率</span><select id="ruleTaxRate">${taxRateOptionsForBrand(brand, taxTypeCode, rule.taxRate)}</select></label>
        <label class="field required"><span>优惠政策</span><select id="rulePreferentialPolicy">${preferentialPolicyOptionsForBrand(brand, preferentialPolicy)}</select></label>
        <label class="field"><span>指定开票税号</span>
          <select id="ruleSpecifiedCompany">
            <option value="">不指定（使用订单门店关联税号）</option>
            ${companies.map((company) => `<option value="${company.id}" ${company.id === rule.specifiedCompanyId ? "selected" : ""}>${escapeHtml(company.legalName)} / ${escapeHtml(companyTaxNumber(company) || "-")}</option>`).join("")}
          </select>
          <small>可选。指定后，命中该规则的商品行使用此税号开票。</small>
        </label>
        <div class="field-message full" id="ruleError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-rule">确定</button>`,
  });
  renderRuleTaxCodeSuggestions();
}

function saveRule() {
  const brand = currentBrand();
  const classification = document.getElementById("ruleClassification").value.trim();
  const matchedTaxClassification = activeClassificationCatalog().find((item) => item.code === classification);
  const taxType = document.getElementById("ruleTaxType").value;
  const values = {
    category: document.getElementById("ruleCategory").value.trim(),
    alias: document.getElementById("ruleAlias").value.trim(),
    classification,
    taxShortName: classificationDisplayName(matchedTaxClassification),
    classificationName: classificationDisplayName(matchedTaxClassification),
    taxType,
    taxTypeName: taxTypeNameForBrand(brand, taxType),
    taxRate: document.getElementById("ruleTaxRate").value,
    preferentialPolicy: document.getElementById("rulePreferentialPolicy").value,
    specifiedCompanyId: document.getElementById("ruleSpecifiedCompany").value,
    updatedAt: nowText(),
  };
  const error = document.getElementById("ruleError");
  if (!values.category || !values.alias || !values.classification || !values.taxType || !values.taxRate) {
    error.textContent = "请完整填写商品大类、大类别名、税收分类编码、税种和税率";
    return;
  }
  if (!matchedTaxClassification) {
    error.textContent = "请选择有效的税收分类编码";
    return;
  }
  if (!isValidTaxTypeRate(brand, values.taxType, values.taxRate)) {
    error.textContent = "请选择当前税种对应的税率";
    return;
  }
  if (brand?.country === "MY" && values.preferentialPolicy !== "无") {
    error.textContent = "马来西亚品牌本期优惠政策仅支持“无”";
    return;
  }
  const selectedCompany = values.specifiedCompanyId
    ? eligibleFallbackTaxpayers().find((company) => company.id === values.specifiedCompanyId)
    : null;
  if (values.specifiedCompanyId && !selectedCompany) {
    error.textContent = "只能选择当前品牌国家下已开通电子发票的纳税人主体";
    return;
  }
  const id = state.modalContext.id;
  const duplicated = brand.config.rules.find(
    (item) => item.category.toLowerCase() === values.category.toLowerCase() && item.id !== id,
  );
  if (duplicated) {
    error.textContent = "当前品牌已存在相同商品大类的规则";
    return;
  }
  const existing = brand.config.rules.find((item) => item.id === id);
  if (existing) Object.assign(existing, values);
  else brand.config.rules.unshift({ id: uid("RULE"), ...values });
  closeModal();
  render();
  showToast(existing ? "商品规则已更新" : "商品规则已新增");
}

function openMalaysiaFallbackEditor(fallbackId = "") {
  const config = ensureBrandInvoiceConfig(currentBrand());
  const taxpayers = eligibleFallbackTaxpayers();
  const fallback = config.fallbacks.find((item) => item.id === fallbackId) || {
    id: "",
    companyId: "",
    itemName: "",
    classification: "",
    classificationName: "",
    taxType: "01",
    taxTypeName: "Sales Tax",
    taxRate: "10%",
  };
  const selectedCompany = taxpayers.find((company) => company.id === fallback.companyId);
  state.modalContext = { type: "malaysia-fallback-editor", id: fallbackId };
  openModal({
    title: fallbackId ? "编辑税号兜底开票规则" : "新增税号兜底开票规则",
    drawer: true,
    className: "fallback-editor-drawer",
    body: `
      <div class="form-grid">
        <label class="field required tax-classification-combobox taxpayer-combobox">
          <span>税务识别号码（TIN）</span>
          <input id="fallbackCompany" type="hidden" value="${escapeHtml(selectedCompany?.id || "")}" />
          <input id="fallbackTaxNo" value="${escapeHtml(selectedCompany?.licenses?.TIN || "")}" placeholder="请输入税务识别号码（TIN）" autocomplete="off" aria-controls="fallbackTaxpayerSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="fallbackTaxpayerSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>纳税人名称</span><input id="fallbackTaxpayerName" value="${escapeHtml(selectedCompany?.legalName || "")}" placeholder="按 TIN 带出" readonly /></label>
        <label class="field required"><span>兜底开票项目名称</span><input id="fallbackItemName" value="${escapeHtml(fallback.itemName)}" placeholder="请输入兜底开票项目名称" /></label>
        <label class="field required tax-classification-combobox">
          <span>商品分类编码（Classification Code）</span>
          <input id="fallbackClassification" value="${escapeHtml(fallback.classification)}" placeholder="请输入商品分类编码" autocomplete="off" aria-controls="fallbackTaxCodeSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="fallbackTaxCodeSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>商品分类名称</span><input id="fallbackTaxShortName" value="${escapeHtml(fallback.classificationName || "")}" placeholder="按商品分类编码带出" readonly /></label>
        <label class="field required"><span>税种编码（Tax Type）</span><select id="fallbackTaxType">${malaysiaTaxTypeOptions(fallback.taxType || "01")}</select></label>
        <label class="field required"><span>税种名称</span><input id="fallbackTaxTypeName" value="${escapeHtml(fallback.taxTypeName || "Sales Tax")}" placeholder="按 Tax Type 带出" readonly /></label>
        <label class="field required"><span>税率（Tax Rate）</span><select id="fallbackTaxRate">${malaysiaTaxRateOptions(fallback.taxType || "01", fallback.taxRate)}</select></label>
        <div class="field-message full" id="fallbackError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-fallback">确定</button>`,
  });
  renderFallbackTaxpayerSuggestions();
  renderFallbackTaxCodeSuggestions();
}

function saveMalaysiaFallback() {
  const classification = document.getElementById("fallbackClassification").value.trim();
  const classificationItem = malaysiaClassificationCatalog.find((item) => item.code === classification);
  const taxTypeCode = document.getElementById("fallbackTaxType").value;
  const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === taxTypeCode);
  const values = {
    companyId: document.getElementById("fallbackCompany").value,
    itemName: document.getElementById("fallbackItemName").value.trim(),
    classification,
    classificationName: classificationItem?.name || "",
    taxType: taxTypeCode,
    taxTypeName: taxType?.name || "",
    taxRate: document.getElementById("fallbackTaxRate").value,
    updatedAt: nowText(),
  };
  const error = document.getElementById("fallbackError");
  if (!values.companyId) {
    error.textContent = "请选择有效的税务识别号码（TIN）";
    return;
  }
  if (!values.itemName || !values.classification || !values.taxType || !values.taxRate) {
    error.textContent = "请完整填写兜底开票项目、商品分类、Tax Type 和 Tax Rate";
    return;
  }
  if (!classificationItem) {
    error.textContent = "请选择有效的商品分类编码";
    return;
  }
  if (!taxType || !taxType.rates.includes(values.taxRate)) {
    error.textContent = "请选择当前 Tax Type 对应的 Tax Rate";
    return;
  }
  const customer = currentCustomer();
  const company = customer.companies.find((item) => item.id === values.companyId);
  if (!company || company.country !== "MY" || company.invoiceStatus !== "opened" || !company.taxpayerExists || !company.licenses?.TIN) {
    error.textContent = "只能选择当前客户下已开通电子发票的马来西亚纳税人主体";
    return;
  }
  const config = ensureBrandInvoiceConfig(currentBrand());
  const id = state.modalContext.id;
  const duplicated = config.fallbacks.find((item) => item.companyId === values.companyId && item.id !== id);
  if (duplicated) {
    error.textContent = "当前品牌已为该 TIN 配置兜底开票规则";
    return;
  }
  const existing = config.fallbacks.find((item) => item.id === id);
  if (existing) Object.assign(existing, values);
  else config.fallbacks.unshift({ id: uid("FB-MY"), ...values });
  closeModal();
  render();
  showToast(existing ? "税号兜底开票规则已更新" : "税号兜底开票规则已新增");
}

function openFallbackEditor(fallbackId = "") {
  const brand = currentBrand();
  const config = ensureBrandInvoiceConfig(brand);
  const taxpayers = eligibleFallbackTaxpayers();
  const fallback = config.fallbacks.find((item) => item.id === fallbackId) || {
    id: "",
    companyId: "",
    itemName: "",
    classification: "",
    taxShortName: "",
    taxType: defaultTaxTypeCode(brand),
    taxRate: brand?.country === "MY" ? "10%" : "13%",
    preferentialPolicy: "无",
  };
  const selectedCompany = taxpayers.find((company) => company.id === fallback.companyId);
  const preferentialPolicy = fallback.preferentialPolicy === "否" ? "无" : fallback.preferentialPolicy || "无";
  const taxTypeCode = fallback.taxType || defaultTaxTypeCode(brand);
  state.modalContext = { type: "fallback-editor", id: fallbackId };
  openModal({
    title: fallbackId ? "编辑税号兜底开票项目" : "新增税号兜底开票项目",
    drawer: true,
    className: "fallback-editor-drawer",
    body: `
      <div class="form-grid">
        <label class="field required tax-classification-combobox taxpayer-combobox">
          <span>税号</span>
          <input id="fallbackCompany" type="hidden" value="${escapeHtml(selectedCompany?.id || "")}" />
          <input id="fallbackTaxNo" value="${escapeHtml(companyTaxNumber(selectedCompany))}" placeholder="请输入税号" autocomplete="off" aria-controls="fallbackTaxpayerSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="fallbackTaxpayerSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>纳税人名称</span><input id="fallbackTaxpayerName" value="${escapeHtml(selectedCompany?.legalName || "")}" placeholder="按税号带出" readonly /></label>
        <label class="field required"><span>大类别名</span><input id="fallbackItemName" value="${escapeHtml(fallback.itemName)}" placeholder="请输入大类别名" /></label>
        <label class="field required tax-classification-combobox">
          <span>税收分类编码</span>
          <input id="fallbackClassification" value="${escapeHtml(fallback.classification)}" placeholder="请输入税收分类编码" autocomplete="off" aria-controls="fallbackTaxCodeSuggestions" aria-autocomplete="list" />
          <div class="tax-code-suggestions hidden" id="fallbackTaxCodeSuggestions" role="listbox"></div>
        </label>
        <label class="field required"><span>税收分类简称</span><input id="fallbackTaxShortName" value="${escapeHtml(fallback.taxShortName || fallback.classificationName || "")}" placeholder="按税收分类编码带出" readonly /></label>
        <label class="field required"><span>税种</span><select id="fallbackTaxType">${taxTypeOptionsForBrand(brand, taxTypeCode)}</select></label>
        <label class="field required"><span>税率</span><select id="fallbackTaxRate">${taxRateOptionsForBrand(brand, taxTypeCode, fallback.taxRate)}</select></label>
        <label class="field required"><span>优惠政策</span><select id="fallbackPreferentialPolicy">${preferentialPolicyOptionsForBrand(brand, preferentialPolicy)}</select></label>
        <div class="field-message full" id="fallbackError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-fallback">确定</button>`,
  });
  renderFallbackTaxpayerSuggestions();
  renderFallbackTaxCodeSuggestions();
}

function saveFallback() {
  const brand = currentBrand();
  const classification = document.getElementById("fallbackClassification").value.trim();
  const matchedTaxClassification = activeClassificationCatalog().find((item) => item.code === classification);
  const taxType = document.getElementById("fallbackTaxType").value;
  const values = {
    companyId: document.getElementById("fallbackCompany").value,
    itemName: document.getElementById("fallbackItemName").value.trim(),
    classification,
    taxShortName: classificationDisplayName(matchedTaxClassification),
    classificationName: classificationDisplayName(matchedTaxClassification),
    taxType,
    taxTypeName: taxTypeNameForBrand(brand, taxType),
    taxRate: document.getElementById("fallbackTaxRate").value,
    preferentialPolicy: document.getElementById("fallbackPreferentialPolicy").value,
    updatedAt: nowText(),
  };
  const error = document.getElementById("fallbackError");
  if (!values.companyId) {
    error.textContent = "请选择有效的开票税号";
    return;
  }
  if (!values.itemName || !values.classification || !values.taxType || !values.taxRate) {
    error.textContent = "请完整填写大类别名、税收分类编码、税种和税率";
    return;
  }
  if (!matchedTaxClassification) {
    error.textContent = "请选择有效的税收分类编码";
    return;
  }
  if (!isValidTaxTypeRate(brand, values.taxType, values.taxRate)) {
    error.textContent = "请选择当前税种对应的税率";
    return;
  }
  if (brand?.country === "MY" && values.preferentialPolicy !== "无") {
    error.textContent = "马来西亚品牌本期优惠政策仅支持“无”";
    return;
  }
  const customer = currentCustomer();
  const company = customer.companies.find((item) => item.id === values.companyId);
  if (
    !company ||
    company.country !== brand.country ||
    company.invoiceStatus !== "opened" ||
    !company.taxpayerExists ||
    !companyTaxNumber(company)
  ) {
    error.textContent = "只能选择当前品牌国家下已开通电子发票的纳税人主体";
    return;
  }
  const id = state.modalContext.id;
  const duplicated = brand.config.fallbacks.find((item) => item.companyId === values.companyId && item.id !== id);
  if (duplicated) {
    error.textContent = "当前品牌已为该税号配置兜底开票项目";
    return;
  }
  const existing = brand.config.fallbacks.find((item) => item.id === id);
  if (existing) Object.assign(existing, values);
  else brand.config.fallbacks.unshift({ id: uid("FB"), ...values });
  closeModal();
  render();
  showToast(existing ? "兜底配置已更新" : "兜底配置已新增");
}

function deleteFallback(fallbackId) {
  const config = ensureBrandInvoiceConfig(currentBrand());
  const fallback = config.fallbacks.find((item) => item.id === fallbackId);
  if (!fallback) return;
  state.modalContext = { type: "fallback-delete", id: fallbackId };
  openModal({
    title: "删除税号兜底开票项目",
    body: `<div class="notice warning"><span>确认删除“大类别名：${escapeHtml(fallback.itemName)}”的兜底配置？删除后可重新新增。</span></div>`,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button danger" type="button" data-action="confirm-delete-fallback">删除</button>`,
  });
}

function confirmDeleteFallback() {
  const config = ensureBrandInvoiceConfig(currentBrand());
  config.fallbacks = config.fallbacks.filter((item) => item.id !== state.modalContext?.id);
  closeModal();
  render();
  showToast("兜底配置已删除");
}

function resetInvoiceImportDraft() {
  state.settingsImportStage = "upload";
  state.settingsImportFileName = "";
  state.settingsImportRemark = "";
  state.settingsImportTaskId = "";
}

function openInvoiceImportRecords(kind) {
  state.settingsImportKind = kind === "fallbacks" ? "fallbacks" : "rules";
  resetInvoiceImportDraft();
  state.settingsView = "import-records";
  render();
}

function createInvoiceImportTask() {
  resetInvoiceImportDraft();
  state.settingsView = "import-flow";
  render();
}

function startInvoiceImportCheck() {
  const customer = currentCustomer();
  const brand = currentBrand();
  if (!brand || !state.settingsImportFileName) return;
  state.settingsImportRemark = document.getElementById("invoiceImportRemark")?.value.trim() || "";
  const tasks = ensureInvoiceImportTasks(customer, brand);
  const task = {
    id: uid(`IMP-${brand.country}-${state.settingsImportKind === "rules" ? "R" : "F"}`),
    createdAt: nowText(),
    status: "checking",
    executable: 8,
    success: 0,
    failed: 0,
    operator: "运营管理员",
    remark: state.settingsImportRemark || "-",
    fileName: state.settingsImportFileName,
  };
  tasks.unshift(task);
  state.settingsImportTaskId = task.id;
  state.settingsImportStage = "checking";
  render();
  setTimeout(() => {
    const activeBrand = currentBrand();
    const currentTask = activeBrand ? currentInvoiceImportTask(currentCustomer(), activeBrand) : null;
    if (state.settingsView !== "import-flow" || state.settingsImportTaskId !== task.id || !currentTask || currentTask.status !== "checking") return;
    currentTask.status = "checked";
    state.settingsImportStage = "checked";
    render();
  }, 900);
}

function openInvoiceImportTask(taskId) {
  const customer = currentCustomer();
  const brand = currentBrand();
  const task = ensureInvoiceImportTasks(customer, brand).find((item) => item.id === taskId);
  if (!task) return;
  state.settingsImportTaskId = task.id;
  state.settingsImportFileName = task.fileName;
  state.settingsImportRemark = task.remark === "-" ? "" : task.remark;
  const stageMap = {
    pending: "checked",
    checked: "checked",
    checking: "checking",
    executing: "executing",
    completed: "completed",
    failed: "failed",
    cancelled: "cancelled",
  };
  state.settingsImportStage = stageMap[task.status] || "checked";
  state.settingsView = "import-flow";
  render();
}

function executeInvoiceImportTask(taskId = state.settingsImportTaskId) {
  const customer = currentCustomer();
  const brand = currentBrand();
  const task = ensureInvoiceImportTasks(customer, brand).find((item) => item.id === taskId);
  if (!task) return;
  state.settingsImportTaskId = task.id;
  state.settingsImportFileName = task.fileName;
  task.status = "executing";
  state.settingsImportStage = "executing";
  state.settingsView = "import-flow";
  render();
  setTimeout(() => {
    const activeBrand = currentBrand();
    const currentTask = activeBrand ? currentInvoiceImportTask(currentCustomer(), activeBrand) : null;
    if (state.settingsImportTaskId !== task.id || !currentTask || currentTask.status !== "executing") return;
    completeInvoiceImportTask(currentTask);
  }, 1100);
}

function applyInvoiceImportSamples(brand) {
  const config = ensureBrandInvoiceConfig(brand);
  const customer = currentCustomer();
  if (state.settingsImportKind === "rules") {
    const samples =
      brand.country === "MY"
        ? [
            { category: "Seasonal Gift Set", alias: "节庆礼盒", classification: "022", taxType: "01", taxRate: "10%" },
            { category: "Gift Voucher", alias: "礼品卡", classification: "044", taxType: "01", taxRate: "5%" },
          ]
        : [
            { category: "节庆礼盒", alias: "礼盒", classification: "1040207000000000000", taxShortName: "箱包", taxRate: "13%", preferentialPolicy: "无", specifiedCompanyId: "" },
            { category: "售后服务", alias: "维修服务", classification: "3049900000000000000", taxShortName: "其他现代服务", taxRate: "6%", preferentialPolicy: "无", specifiedCompanyId: "" },
          ];
    samples
      .slice()
      .reverse()
      .forEach((sample) => {
        if (config.rules.some((rule) => rule.category.toLowerCase() === sample.category.toLowerCase())) return;
        if (brand.country === "MY") {
          const classification = malaysiaClassificationCatalog.find((item) => item.code === sample.classification);
          const taxType = malaysiaTaxTypeCatalog.find((item) => item.code === sample.taxType);
          config.rules.unshift({
            id: uid("RULE-MY"),
            ...sample,
            classificationName: classification?.name || "",
            taxTypeName: taxType?.name || "",
            updatedAt: nowText(),
          });
        } else {
          config.rules.unshift({ id: uid("RULE-CN"), ...sample, updatedAt: nowText() });
        }
      });
    return;
  }
  const eligibleCompanies = customer.companies.filter(
    (company) =>
      company.country === brand.country &&
      company.invoiceStatus === "opened" &&
      (brand.country === "MY" ? company.licenses?.TIN : company.licenses?.USCC),
  );
  const existingCompanyIds = new Set(config.fallbacks.map((fallback) => fallback.companyId));
  eligibleCompanies
    .filter((company) => !existingCompanyIds.has(company.id))
    .slice(0, 2)
    .forEach((company) => {
      if (brand.country === "MY") {
        config.fallbacks.unshift({
          id: uid("FB-MY"),
          companyId: company.id,
          itemName: "默认零售商品",
          classification: "022",
          classificationName: "Others",
          taxType: "01",
          taxTypeName: "Sales Tax",
          taxRate: "10%",
          updatedAt: nowText(),
        });
      } else {
        config.fallbacks.unshift({
          id: uid("FB-CN"),
          companyId: company.id,
          itemName: "零售商品",
          classification: "1040201000000000000",
          taxShortName: "服装",
          taxRate: "13%",
          preferentialPolicy: "无",
          updatedAt: nowText(),
        });
      }
    });
}

function completeInvoiceImportTask(task) {
  const brand = currentBrand();
  applyInvoiceImportSamples(brand);
  task.status = "completed";
  task.success = task.executable || 8;
  task.failed = 0;
  state.settingsImportStage = "completed";
  render();
  showToast(`${invoiceImportRuleLabel(brand)}导入完成`);
}

function cancelInvoiceImportTask() {
  const brand = currentBrand();
  const task = brand ? currentInvoiceImportTask(currentCustomer(), brand) : null;
  if (task) task.status = "cancelled";
  state.settingsView = "import-records";
  state.settingsImportStage = "upload";
  state.settingsImportFileName = "";
  state.settingsImportRemark = "";
  state.settingsImportTaskId = "";
  render();
  showToast("导入任务已取消");
}

function openPaymentEditor(paymentId = "") {
  const brand = currentBrand();
  const config = ensureBrandInvoiceConfig(brand);
  const payment = config.payments.find((item) => item.id === paymentId) || { id: "", code: "", name: "" };
  state.modalContext = { type: "payment-editor", id: paymentId };
  openModal({
    title: paymentId ? "编辑不可开票支付方式" : "新增不可开票支付方式",
    drawer: true,
    body: `
      <div class="form-grid">
        <label class="field required"><span>支付方式编号</span><input id="paymentCode" value="${escapeHtml(payment.code)}" placeholder="请输入支付方式编号" /></label>
        <label class="field required"><span>支付方式名称</span><input id="paymentName" value="${escapeHtml(payment.name)}" placeholder="请输入支付方式名称" /></label>
        <div class="field-message full" id="paymentError"></div>
      </div>
    `,
    actions: `<button class="button" type="button" data-action="close-modal">取消</button><button class="button primary" type="button" data-action="save-payment">保存</button>`,
  });
}

function savePayment() {
  const code = document.getElementById("paymentCode").value.trim();
  const name = document.getElementById("paymentName").value.trim();
  if (!code || !name) {
    document.getElementById("paymentError").textContent = "请填写支付方式编号和支付方式名称";
    return;
  }
  const config = ensureBrandInvoiceConfig(currentBrand());
  const existing = config.payments.find((item) => item.id === state.modalContext.id);
  const values = { code, name, updatedAt: nowText() };
  if (existing) Object.assign(existing, values);
  else config.payments.unshift({ id: uid("PAY"), ...values });
  closeModal();
  render();
  showToast(existing ? "不可开票支付方式已更新" : "不可开票支付方式已新增");
}

function readApplicationDraftFromDom() {
  const brand = currentBrand();
  if (!brand || !state.applicationDraft) return;
  const draft = state.applicationDraft;
  const qrDays = document.getElementById("applicationQrDays");
  const enabled = document.getElementById("applicationSelfReissueEnabled");
  const maxCount = document.getElementById("applicationSelfReissueMaxCount");
  const validDays = document.getElementById("applicationSelfReissueValidDays");
  const pageStyle = document.getElementById("applicationPageStyle");
  const noteEditor = document.getElementById("applicationNoteEditor");
  if (qrDays) draft.qrDays = qrDays.value;
  if (enabled) draft.selfReissueEnabled = enabled.checked;
  if (maxCount) draft.selfReissueMaxCount = maxCount.value;
  if (validDays) draft.selfReissueValidDays = validDays.value;
  if (pageStyle) draft.pageStyle = pageStyle.value;
  if (noteEditor) draft.noteHtml = sanitizeApplicationNoteHtml(noteEditor.innerHTML);
}

function applicationSectionFields(section) {
  if (section === "qr") return ["qrDays"];
  if (section === "selfReissue") return ["selfReissueEnabled", "selfReissueMaxCount", "selfReissueValidDays"];
  return ["pageStyle", "theme", "note", "noteHtml", "logo"];
}

function resetApplicationDraftSection(section) {
  const brand = currentBrand();
  const config = ensureBrandInvoiceConfig(brand);
  const draft = applicationDraftFor(brand, config.application);
  applicationSectionFields(section).forEach((field) => {
    draft[field] = structuredClone(config.application[field]);
  });
}

function editApplicationSection(section) {
  resetApplicationDraftSection(section);
  state.applicationEditMode[section] = true;
  state.applicationErrors[section] = "";
  render();
}

function cancelApplicationSection(section) {
  resetApplicationDraftSection(section);
  state.applicationEditMode[section] = false;
  state.applicationErrors[section] = "";
  render();
}

function validPositiveInteger(value) {
  return value !== "" && Number.isInteger(Number(value)) && Number(value) > 0;
}

function saveApplicationSection(section) {
  readApplicationDraftFromDom();
  const brand = currentBrand();
  const config = ensureBrandInvoiceConfig(brand);
  const draft = applicationDraftFor(brand, config.application);

  if (section === "qr" && !validPositiveInteger(draft.qrDays)) {
    state.applicationErrors.qr = "小票二维码有效期必须填写正整数";
    render();
    return;
  }
  if (
    section === "selfReissue" &&
    draft.selfReissueEnabled &&
    (!validPositiveInteger(draft.selfReissueMaxCount) || !validPositiveInteger(draft.selfReissueValidDays))
  ) {
    state.applicationErrors.selfReissue = "换开次数和可换开天数必须填写正整数";
    render();
    return;
  }
  if (section === "page") {
    const text = String(draft.noteHtml || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!text) {
      state.applicationErrors.page = "请填写开票说明";
      render();
      return;
    }
  }

  applicationSectionFields(section).forEach((field) => {
    config.application[field] = structuredClone(draft[field]);
  });
  if (section === "page") {
    config.application.note = String(config.application.noteHtml || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  state.applicationEditMode[section] = false;
  state.applicationErrors[section] = "";
  render();
  const messages = {
    qr: "开票二维码有效期已保存",
    selfReissue: "自助换开设置已保存",
    page: "开票申请页设置已保存",
  };
  showToast(messages[section]);
}

function handleApplicationLogoFile(file) {
  if (!file || !state.applicationDraft) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.applicationDraft.logo = {
      source: "custom",
      fileName: file.name,
      dataUrl: String(reader.result || ""),
    };
    render();
  });
  reader.readAsDataURL(file);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "create-ka-customer") openCustomerEditor("KA");
  if (action === "create-isv-customer") openCustomerEditor("ISV");
  if (action === "search-customers") {
    state.customerNameKeyword = document.getElementById("customerNameInput").value.trim();
    state.customerShortNameKeyword = document.getElementById("customerShortNameInput").value.trim();
    state.customerIdKeyword = document.getElementById("customerIdInput").value.trim();
    state.customerSalesKeyword = document.getElementById("customerSalesInput").value;
    state.customerTypeKeyword = document.getElementById("customerTypeInput").value;
    render();
  }
  if (action === "reset-customers") {
    state.customerNameKeyword = "";
    state.customerShortNameKeyword = "";
    state.customerIdKeyword = "";
    state.customerSalesKeyword = "";
    state.customerTypeKeyword = "";
    render();
  }
  if (action === "open-customer") {
    state.currentCustomerId = target.dataset.id;
    state.currentCompanyId = "";
    state.currentBrandId = "";
    state.customerTab = "basic";
    state.view = "customer-detail";
    render();
  }
  if (action === "back-customer-list") {
    state.view = "customer-list";
    render();
  }
  if (action === "customer-tab") {
    state.customerTab = target.dataset.tab;
    render();
  }
  if (action === "edit-customer") openCustomerEditor(currentCustomer().customerType, currentCustomer().id);
  if (action === "search-companies") {
    state.companyNameKeyword = document.getElementById("companyNameInput").value.trim();
    state.companyCountryKeyword = document.getElementById("companyCountryFilterInput").value;
    state.companyRegistrationKeyword = document.getElementById("companyRegistrationInput").value.trim();
    state.companyTypeKeyword = document.getElementById("companyTypeInput").value;
    state.companyInvoiceStatusKeyword = document.getElementById("companyInvoiceStatusInput").value;
    render();
  }
  if (action === "reset-companies") {
    state.companyNameKeyword = "";
    state.companyCountryKeyword = "";
    state.companyRegistrationKeyword = "";
    state.companyTypeKeyword = "";
    state.companyInvoiceStatusKeyword = "";
    render();
  }
  if (action === "search-brands") {
    state.brandNameKeyword = document.getElementById("brandNameInput").value.trim();
    state.brandIdKeyword = document.getElementById("brandIdInput").value.trim();
    render();
  }
  if (action === "reset-brands") {
    state.brandNameKeyword = "";
    state.brandIdKeyword = "";
    render();
  }
  if (action === "confirm-product-open") confirmProductOpen();
  if (action === "open-einvoice-settings") {
    const customer = currentCustomer();
    if (!customer.productOpen) {
      showToast("请先开通客户电子发票产品");
      return;
    }
    state.currentBrandId = "";
    state.settingsView = "brand-list";
    state.settingsTab = "stores";
    resetApplicationEditorState();
    state.view = "einvoice-settings";
    render();
  }
  if (action === "create-company") openCompanyEditor();
  if (action === "edit-company") openCompanyEditor(target.dataset.id);
  if (action === "open-company-detail") {
    state.currentCompanyId = target.dataset.id;
    state.companyTab = "master";
    state.companyFunctionView = "list";
    state.companyBranchCountryKeyword = "";
    state.companyBranchNameKeyword = "";
    state.companyBranchRegistrationKeyword = "";
    state.companyBranchTypeKeyword = "";
    state.companyBranchInvoiceStatusKeyword = "";
    state.companyStoreBrandKeyword = "";
    state.companyStoreNameKeyword = "";
    state.companyStoreNoKeyword = "";
    state.companyStoreIdKeyword = "";
    state.view = "company-detail";
    render();
  }
  if (action === "company-tab") {
    state.companyTab = target.dataset.tab;
    if (state.companyTab === "function") state.companyFunctionView = "list";
    render();
  }
  if (action === "search-company-branches") {
    state.companyBranchNameKeyword = document.getElementById("companyBranchNameInput").value.trim();
    state.companyBranchCountryKeyword = document.getElementById("companyBranchCountryFilterInput").value;
    state.companyBranchRegistrationKeyword = document.getElementById("companyBranchRegistrationInput").value.trim();
    state.companyBranchTypeKeyword = document.getElementById("companyBranchTypeInput").value;
    state.companyBranchInvoiceStatusKeyword = document.getElementById("companyBranchInvoiceStatusInput").value;
    render();
  }
  if (action === "reset-company-branches") {
    state.companyBranchCountryKeyword = "";
    state.companyBranchNameKeyword = "";
    state.companyBranchRegistrationKeyword = "";
    state.companyBranchTypeKeyword = "";
    state.companyBranchInvoiceStatusKeyword = "";
    render();
  }
  if (action === "search-company-stores") {
    state.companyStoreBrandKeyword = document.getElementById("companyStoreBrandFilter").value;
    state.companyStoreNameKeyword = document.getElementById("companyStoreNameFilter").value.trim();
    state.companyStoreNoKeyword = document.getElementById("companyStoreNoFilter").value.trim();
    state.companyStoreIdKeyword = document.getElementById("companyStoreIdFilter").value.trim();
    render();
  }
  if (action === "reset-company-stores") {
    state.companyStoreBrandKeyword = "";
    state.companyStoreNameKeyword = "";
    state.companyStoreNoKeyword = "";
    state.companyStoreIdKeyword = "";
    render();
  }
  if (action === "open-company-store-picker") openCompanyStorePicker();
  if (action === "request-remove-company-store") openRemoveCompanyStoreConfirm(target.dataset.id);
  if (action === "open-company-invoice-feature") {
    const company = currentCompany();
    if (company.country === "MY") {
      openCompanyInvoice();
    } else {
      state.companyFunctionView = "invoice";
      render();
    }
  }
  if (action === "back-company-function-list") {
    state.companyFunctionView = "list";
    render();
  }
  if (action === "back-customer-detail") {
    state.view = "customer-detail";
    state.customerTab = target.dataset.tab || "basic";
    render();
  }
  if (action === "go-product-feature") {
    state.view = "customer-detail";
    state.customerTab = "products";
    render();
  }
  if (action === "open-company-invoice-from-list") openCompanyInvoiceFromList(target.dataset.id);
  if (action === "open-company-invoice") openCompanyInvoice();
  if (action === "create-brand") openBrandEditor();
  if (action === "open-brand-detail") {
    state.currentBrandId = target.dataset.id;
    state.brandTab = "info";
    state.brandStoreIdKeyword = "";
    state.brandStoreNameKeyword = "";
    state.brandStoreNoKeyword = "";
    state.view = "brand-detail";
    render();
  }
  if (action === "brand-tab") {
    state.brandTab = target.dataset.tab;
    render();
  }
  if (action === "edit-brand") openBrandEditor(target.dataset.id);
  if (action === "add-brand-logo-scheme") openBrandLogoSchemeEditor();
  if (action === "edit-brand-logo-scheme") openBrandLogoSchemeEditor(target.dataset.id);
  if (action === "delete-brand-logo-scheme") deleteBrandLogoScheme(target.dataset.id);
  if (action === "search-brand-stores") {
    state.brandStoreIdKeyword = document.getElementById("brandStoreIdInput").value.trim();
    state.brandStoreNameKeyword = document.getElementById("brandStoreNameInput").value.trim();
    state.brandStoreNoKeyword = document.getElementById("brandStoreNoInput").value.trim();
    render();
  }
  if (action === "reset-brand-stores") {
    state.brandStoreIdKeyword = "";
    state.brandStoreNameKeyword = "";
    state.brandStoreNoKeyword = "";
    render();
  }
  if (action === "import-brand-stores") openBrandStoreImport();
  if (action === "create-store") openStoreEditor();
  if (action === "open-store-detail") openStoreDetail(target.dataset.id);
  if (action === "back-product-feature") {
    state.view = "customer-detail";
    state.customerTab = "products";
    render();
  }
  if (action === "search-settings-brands") {
    state.settingsBrandNameKeyword = document.getElementById("settingsBrandNameInput").value.trim();
    state.settingsBrandIdKeyword = document.getElementById("settingsBrandIdInput").value.trim();
    render();
  }
  if (action === "reset-settings-brands") {
    state.settingsBrandNameKeyword = "";
    state.settingsBrandIdKeyword = "";
    render();
  }
  if (action === "open-brand-invoice-settings") {
    state.currentBrandId = target.dataset.id;
    state.settingsView = "brand-detail";
    state.settingsTab = "stores";
    state.itemNameSourceEditing = false;
    resetApplicationEditorState();
    render();
  }
  if (action === "back-brand-settings-list") {
    state.currentBrandId = "";
    state.settingsView = "brand-list";
    state.settingsTab = "stores";
    state.itemNameSourceEditing = false;
    resetApplicationEditorState();
    render();
  }
  if (action === "back-brand-invoice-settings" || action === "back-invoice-import-rule") {
    state.settingsView = "brand-detail";
    state.settingsTab = state.settingsImportKind === "fallbacks" ? "fallback" : "rules";
    resetInvoiceImportDraft();
    render();
  }
  if (action === "back-invoice-import-records") {
    state.settingsView = "import-records";
    state.settingsImportStage = "upload";
    state.settingsImportFileName = "";
    state.settingsImportRemark = "";
    state.settingsImportTaskId = "";
    render();
  }
  if (action === "settings-tab") {
    if (state.settingsTab === "application" && target.dataset.tab !== "application") resetApplicationEditorState();
    state.settingsTab = target.dataset.tab;
    state.itemNameSourceEditing = false;
    render();
  }
  if (action === "search-settings-stores") {
    state.settingsStoreNameKeyword = document.getElementById("settingsStoreNameInput").value.trim();
    state.settingsStoreNoKeyword = document.getElementById("settingsStoreNoInput").value.trim();
    render();
  }
  if (action === "reset-settings-stores") {
    state.settingsStoreNameKeyword = "";
    state.settingsStoreNoKeyword = "";
    render();
  }
  if (action === "search-settings-rules") {
    state.settingsRuleCategoryKeyword = document.getElementById("settingsRuleCategoryInput").value.trim();
    state.settingsRuleTaxCodeKeyword = document.getElementById("settingsRuleTaxCodeInput").value.trim();
    render();
  }
  if (action === "reset-settings-rules") {
    state.settingsRuleCategoryKeyword = "";
    state.settingsRuleTaxCodeKeyword = "";
    render();
  }
  if (action === "search-settings-fallbacks") {
    state.settingsFallbackTaxNoKeyword = document.getElementById("settingsFallbackTaxNoInput").value.trim();
    state.settingsFallbackTaxCodeKeyword = document.getElementById("settingsFallbackTaxCodeInput").value.trim();
    render();
  }
  if (action === "reset-settings-fallbacks") {
    state.settingsFallbackTaxNoKeyword = "";
    state.settingsFallbackTaxCodeKeyword = "";
    render();
  }
  if (action === "edit-item-name-source") {
    state.itemNameSourceEditing = true;
    render();
  }
  if (action === "cancel-item-name-source") {
    state.itemNameSourceEditing = false;
    render();
  }
  if (action === "save-item-name-source") {
    ensureBrandInvoiceConfig(currentBrand()).itemNameSource = document.getElementById("itemNameSourceSelect").value;
    state.itemNameSourceEditing = false;
    render();
    showToast("发票明细项目名称设置已保存");
  }
  if (action === "open-invoice-import-records") openInvoiceImportRecords(target.dataset.kind);
  if (action === "create-invoice-import-task") createInvoiceImportTask();
  if (action === "open-invoice-import-task") openInvoiceImportTask(target.dataset.id);
  if (action === "execute-invoice-import-task") executeInvoiceImportTask(target.dataset.id);
  if (action === "start-invoice-import-check") startInvoiceImportCheck();
  if (action === "run-invoice-import-task") executeInvoiceImportTask();
  if (action === "restart-invoice-import-upload") {
    const task = currentInvoiceImportTask(currentCustomer(), currentBrand());
    if (task && task.status !== "completed") task.status = "cancelled";
    resetInvoiceImportDraft();
    state.settingsView = "import-flow";
    render();
  }
  if (action === "cancel-invoice-import-task") cancelInvoiceImportTask();
  if (action === "download-invoice-import-template") showToast(`${invoiceImportRuleLabel(currentBrand())}导入模板已下载`);
  if (action === "download-invoice-import-check-report") showToast("文件检查报告已下载");
  if (action === "download-invoice-import-execution-report") showToast("任务执行报告已下载");
  if (action === "toggle-store-invoice") {
    const store = currentBrand().stores.find((item) => item.id === target.dataset.id);
    if (store) {
      if (!store.invoiceEnabled && currentBrand().country === "MY") {
        const company = currentCustomer().companies.find((item) => item.id === store.companyId);
        if (!company || company.country !== "MY" || company.invoiceStatus !== "opened" || !company.taxpayerExists || !company.licenses?.TIN) {
          showToast("请先为门店关联已开通电子发票且具有有效 TIN 的马来西亚公司");
          return;
        }
      }
      store.invoiceEnabled = !store.invoiceEnabled;
      store.updatedAt = nowText();
      render();
      showToast(store.invoiceEnabled ? "门店开票已启用" : "门店开票已关闭");
    }
  }
  if (action === "create-rule") openRuleEditor();
  if (action === "edit-rule") openRuleEditor(target.dataset.id);
  if (action === "create-fallback") openFallbackEditor();
  if (action === "edit-fallback") openFallbackEditor(target.dataset.id);
  if (action === "delete-fallback") deleteFallback(target.dataset.id);
  if (action === "create-payment") openPaymentEditor();
  if (action === "edit-payment") openPaymentEditor(target.dataset.id);
  if (action === "edit-application-section") editApplicationSection(target.dataset.section);
  if (action === "cancel-application-section") cancelApplicationSection(target.dataset.section);
  if (action === "save-application-section") saveApplicationSection(target.dataset.section);
  if (action === "select-application-theme") {
    readApplicationDraftFromDom();
    state.applicationDraft.theme = target.dataset.theme;
    render();
  }
  if (action === "upload-application-logo") document.getElementById("applicationLogoFile")?.click();
  if (action === "restore-application-logo") {
    readApplicationDraftFromDom();
    state.applicationDraft.logo = {
      source: "brand",
      fileName: "",
      dataUrl: "",
    };
    render();
  }
  if (action === "application-rich-command") {
    document.getElementById("applicationNoteEditor")?.focus();
    document.execCommand(target.dataset.command, false);
    readApplicationDraftFromDom();
  }
});

modalRoot.addEventListener("click", (event) => {
  if (!event.target.closest(".industry-cascader")) closeIndustryCascaders();
  if (!event.target.closest(".tax-classification-combobox")) {
    document.getElementById("ruleTaxCodeSuggestions")?.classList.add("hidden");
    document.getElementById("fallbackTaxCodeSuggestions")?.classList.add("hidden");
    document.getElementById("fallbackTaxpayerSuggestions")?.classList.add("hidden");
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "select-rule-tax-code") {
    setRuleTaxClassification(target.dataset.code);
    document.getElementById("ruleTaxCodeSuggestions")?.classList.add("hidden");
    return;
  }
  if (action === "select-fallback-taxpayer") {
    setFallbackTaxpayer(target.dataset.id);
    document.getElementById("fallbackTaxpayerSuggestions")?.classList.add("hidden");
    return;
  }
  if (action === "select-fallback-tax-code") {
    setFallbackTaxClassification(target.dataset.code);
    document.getElementById("fallbackTaxCodeSuggestions")?.classList.add("hidden");
    return;
  }
  if (action === "toggle-industry-cascader") {
    toggleIndustryCascader(target.dataset.prefix);
    return;
  }
  if (action === "select-industry-level-one") {
    activateIndustryLevelOne(target.dataset.prefix, target.dataset.levelOne);
    return;
  }
  if (action === "select-industry-level-two") {
    selectIndustryLevelTwo(target.dataset.prefix, target.dataset.levelOne, target.dataset.levelTwo);
    return;
  }
  if (action === "toggle-store-region-cascader") {
    toggleStoreRegionCascader();
    return;
  }
  if (action === "select-store-region-level-one") {
    activateStoreRegionLevelOne(target.dataset.country, target.dataset.levelOne);
    return;
  }
  if (action === "select-store-region-level-two") {
    activateStoreRegionLevelTwo(target.dataset.country, target.dataset.levelOne, target.dataset.levelTwo);
    return;
  }
  if (action === "select-store-region-level-three") {
    selectStoreRegion(
      target.dataset.country,
      target.dataset.levelOne,
      target.dataset.levelTwo || "",
      target.dataset.levelThree,
    );
    return;
  }
  if (action === "close-modal") {
    if (event.target.classList.contains("modal-backdrop") || target.classList.contains("modal-close") || target.classList.contains("button")) closeModal();
  }
  if (action === "save-customer") saveCustomer();
  if (action === "open-product-now") openProductNow();
  if (action === "save-company") saveCompany();
  if (action === "edit-current-company") {
    const id = state.currentCompanyId;
    closeModal();
    openCompanyEditor(id);
  }
  if (action === "next-company-invoice-open") nextCompanyInvoiceOpen();
  if (action === "prev-company-invoice-open") {
    state.companyInvoiceOpenStep = 1;
    state.companyInvoiceOpenError = "";
    state.companyInvoiceMissingLicenses = [];
    renderCompanyInvoiceOpenDrawer();
  }
  if (action === "go-product-feature-from-company-open") {
    closeModal();
    state.view = "customer-detail";
    state.customerTab = "products";
    render();
  }
  if (action === "search-company-store-picker") {
    readCompanyStorePickerFilters();
    renderCompanyStorePicker();
  }
  if (action === "reset-company-store-picker") {
    state.companyStorePickerBrandKeyword = "";
    state.companyStorePickerNameKeyword = "";
    state.companyStorePickerNoKeyword = "";
    state.companyStorePickerIdKeyword = "";
    renderCompanyStorePicker();
  }
  if (action === "confirm-company-store-picker") confirmCompanyStorePicker();
  if (action === "confirm-remove-company-store") confirmRemoveCompanyStore();
  if (action === "confirm-company-open") confirmCompanyOpen();
  if (action === "save-brand") saveBrand();
  if (action === "save-brand-logo-scheme") saveBrandLogoScheme();
  if (action === "save-store") saveStore();
  if (action === "edit-store-from-detail") {
    const storeId = target.dataset.id;
    closeModal();
    openStoreEditor(storeId);
  }
  if (action === "download-store-template") showToast("门店导入模板已下载");
  if (action === "confirm-brand-store-import") confirmBrandStoreImport();
  if (action === "save-rule") saveRule();
  if (action === "save-fallback") saveFallback();
  if (action === "confirm-delete-fallback") confirmDeleteFallback();
  if (action === "save-payment") savePayment();
});

modalRoot.addEventListener("focusin", (event) => {
  if (event.target.id === "ruleClassification") {
    const suggestions = document.getElementById("ruleTaxCodeSuggestions");
    suggestions?.classList.remove("hidden");
    renderRuleTaxCodeSuggestions(event.target.value);
  }
  if (event.target.id === "fallbackTaxNo") {
    const suggestions = document.getElementById("fallbackTaxpayerSuggestions");
    suggestions?.classList.remove("hidden");
    renderFallbackTaxpayerSuggestions(event.target.value);
  }
  if (event.target.id === "fallbackClassification") {
    const suggestions = document.getElementById("fallbackTaxCodeSuggestions");
    suggestions?.classList.remove("hidden");
    renderFallbackTaxCodeSuggestions(event.target.value);
  }
});

modalRoot.addEventListener("input", (event) => {
  if (event.target.id === "ruleClassification") {
    setRuleTaxClassification(event.target.value);
    const suggestions = document.getElementById("ruleTaxCodeSuggestions");
    suggestions?.classList.remove("hidden");
    renderRuleTaxCodeSuggestions(event.target.value);
  }
  if (event.target.id === "fallbackTaxNo") {
    syncFallbackTaxpayerFromInput(event.target.value);
    const suggestions = document.getElementById("fallbackTaxpayerSuggestions");
    suggestions?.classList.remove("hidden");
    renderFallbackTaxpayerSuggestions(event.target.value);
  }
  if (event.target.id === "fallbackClassification") {
    setFallbackTaxClassification(event.target.value);
    const suggestions = document.getElementById("fallbackTaxCodeSuggestions");
    suggestions?.classList.remove("hidden");
    renderFallbackTaxCodeSuggestions(event.target.value);
  }
});

modalRoot.addEventListener("change", (event) => {
  if (event.target.id === "customerSales") {
    const sales = salesOptions.find((item) => item.name === event.target.value);
    state.customerDraft.salesName = event.target.value;
    state.customerDraft.salesOrg = sales?.organization || "";
    const organization = document.getElementById("customerSalesOrg");
    if (organization) organization.textContent = state.customerDraft.salesOrg || "-";
  }
  if (event.target.id === "customerStandardLogo" || event.target.id === "customerHorizontalLogo") {
    const file = event.target.files?.[0];
    if (!file) return;
    const key = event.target.id === "customerStandardLogo" ? "standardLogo" : "horizontalLogo";
    state.customerDraft[key] = file.name;
    const name = document.getElementById(`${event.target.id}Name`);
    if (name) name.textContent = file.name;
  }
  if (event.target.id === "brandStandardLogo" || event.target.id === "brandHorizontalLogo") {
    const file = event.target.files?.[0];
    if (!file) return;
    const name = document.getElementById(`${event.target.id}Name`);
    if (name) name.textContent = file.name;
  }
  if (event.target.id === "brandLogoSchemeStandard" || event.target.id === "brandLogoSchemeHorizontal") {
    handleBrandLogoSchemeFile(event.target);
  }
  if (event.target.id === "brandStoreImportFile") {
    const file = event.target.files?.[0];
    const name = document.getElementById("brandStoreImportFileName");
    if (name) name.textContent = file?.name || "";
    const error = document.getElementById("brandStoreImportError");
    if (error) error.textContent = "";
  }
  if (event.target.id === "ruleTaxType") {
    syncMalaysiaTaxTypeFields("rule");
  }
  if (event.target.id === "fallbackTaxType") {
    syncMalaysiaTaxTypeFields("fallback");
  }
  if (event.target.id === "companyCountry") {
    const previousCountry = state.companyDraft.country;
    readCompanyDraftFromForm();
    const nextCountry = event.target.value;
    const shouldConfirm = previousCountry && previousCountry !== nextCountry && hasCompanyDraftContent(state.companyDraft);
    if (shouldConfirm && !window.confirm("切换国家/地区后，已填写的公司信息将被清空，是否继续？")) {
      renderCompanyEditor();
      return;
    }
    state.companyDraft = blankCompany(nextCountry);
    state.companyErrors = {};
    renderCompanyEditor();
    return;
  }
  if (event.target.id === "companyType") {
    readCompanyDraftFromForm();
    state.companyDraft.type = event.target.value;
    if (state.companyDraft.type === "Head") state.companyDraft.parentCompanyId = "";
    state.companyErrors = {};
    renderCompanyEditor();
  }
  if (event.target.id === "companyStorePickerOnlyAvailable") {
    state.companyStorePickerOnlyAvailable = event.target.checked;
    renderCompanyStorePicker();
  }
  if (event.target.id === "companyStorePickerSelectAll") {
    const company = currentCompany();
    const visibleRecords = customerStoreRecords().filter(
      (record) =>
        record.brand.country === company.country &&
        !record.store.companyId &&
        companyStoreMatches(record, companyStorePickerFilters()) &&
        (!state.companyStorePickerOnlyAvailable || !record.store.companyId),
    );
    visibleRecords.forEach((record) => {
      if (event.target.checked) state.companyStoreSelectedIds.add(record.store.id);
      else state.companyStoreSelectedIds.delete(record.store.id);
    });
    renderCompanyStorePicker();
  }
  if (event.target.dataset.action === "select-company-store" && !event.target.disabled) {
    if (event.target.checked) state.companyStoreSelectedIds.add(event.target.dataset.id);
    else state.companyStoreSelectedIds.delete(event.target.dataset.id);
    renderCompanyStorePicker();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".industry-cascader")) closeIndustryCascaders();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeIndustryCascaders();
});

app.addEventListener("input", (event) => {
  if (!state.applicationDraft) return;
  if (event.target.id === "applicationQrDays") state.applicationDraft.qrDays = event.target.value;
  if (event.target.id === "applicationSelfReissueMaxCount") state.applicationDraft.selfReissueMaxCount = event.target.value;
  if (event.target.id === "applicationSelfReissueValidDays") state.applicationDraft.selfReissueValidDays = event.target.value;
  if (event.target.id === "applicationNoteEditor") {
    state.applicationDraft.noteHtml = sanitizeApplicationNoteHtml(event.target.innerHTML);
  }
});

app.addEventListener("change", (event) => {
  if (event.target.id === "settingsBrandSelect") {
    state.currentBrandId = event.target.value;
    render();
  }
  if (event.target.id === "applicationPageStyle" && state.applicationDraft) {
    state.applicationDraft.pageStyle = event.target.value;
  }
  if (event.target.id === "applicationSelfReissueEnabled" && state.applicationDraft) {
    readApplicationDraftFromDom();
    state.applicationDraft.selfReissueEnabled = event.target.checked;
    render();
  }
  if (event.target.id === "applicationLogoFile") {
    handleApplicationLogoFile(event.target.files?.[0]);
  }
  if (event.target.id === "invoiceImportFile") {
    const file = event.target.files?.[0];
    state.settingsImportRemark = document.getElementById("invoiceImportRemark")?.value || state.settingsImportRemark;
    state.settingsImportFileName = file?.name || "";
    render();
  }
});

document.getElementById("customerMenuButton").addEventListener("click", () => {
  state.view = "customer-list";
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalRoot.innerHTML) closeModal();
});

render();
