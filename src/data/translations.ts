import { Language } from '../types';

export interface TranslationStrings {
  brandName: string;
  navExpedition: string;
  navFoodChain: string;
  navScamImmunity: string;
  navPackages: string;
  navCharter: string;
  registerExpedition: string;
  requestBriefing: string;
  heroKicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  nonTransactionGuaranteeTitle: string;
  nonTransactionGuaranteeDesc: string;
  viewPackages: string;
  marketRealityTitle: string;
  marketRealitySubtitle: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  scamToolTitle: string;
  scamToolSubtitle: string;
  packagesTitle: string;
  packagesSubtitle: string;
  charterTitle: string;
  charterSubtitle: string;
  kycNotice: string;
}

export const translations: Record<Language, TranslationStrings> = {
  EN: {
    brandName: "UGANDA GOLD EXPEDITION",
    navExpedition: "The Expedition",
    navFoodChain: "The Food Chain",
    navScamImmunity: "Scam Immunity",
    navPackages: "Packages",
    navCharter: "Legal Charter",
    registerExpedition: "Register for Expedition",
    requestBriefing: "Request Private B2B Briefing",
    heroKicker: "EAST AFRICA'S PREMIER DUE DILIGENCE EXPEDITION",
    heroHeadline: "DON'T WIRE A SINGLE DOLLAR UNTIL YOU WALK THE SUPPLY CHAIN.",
    heroSubheadline: "The world's only hands-on anti-fraud & due-diligence expedition across East Africa's gold trade architecture.",
    nonTransactionGuaranteeTitle: "STRICT NON-TRANSACTION GUARANTEE",
    nonTransactionGuaranteeDesc: "We do NOT sell gold, broker trades, or receive finder fees. Our sole mandate is forensic supply chain verification, anti-fraud intelligence, and institutional due diligence.",
    viewPackages: "View Expedition Packages",
    marketRealityTitle: "Market Reality & Discrepancies",
    marketRealitySubtitle: "Forensic intelligence on East Africa's multi-billion dollar transit corridors and counterfeit ecosystems.",
    itineraryTitle: "7-Day Immersion Itinerary",
    itinerarySubtitle: "From the sovereign mineral cadastre to artisanal pitheads and bonded assay vaults.",
    scamToolTitle: "The Scam Immunity Matrix",
    scamToolSubtitle: "Deconstruct suspicious gold offers with real forensic risk indicators before risking capital.",
    packagesTitle: "Expedition Packages & Tiers",
    packagesSubtitle: "Strictly limited to accredited commodity traders, fund principals, and corporate counsel.",
    charterTitle: "Compliance & Legal Charter",
    charterSubtitle: "Anchored in the Uganda Mining & Minerals Act 2022, ICGLR Regional Standards, and OECD Guidance.",
    kycNotice: "Notice: USD $1,000 of your registration deposit is allocated to sovereign KYC and statutory security clearance, and is strictly non-refundable."
  },
  AR: {
    brandName: "بعثة أوغندا لتدقيق الذهب",
    navExpedition: "البعثة",
    navFoodChain: "سلسلة الإمداد",
    navScamImmunity: "كشف الاحتيال",
    navPackages: "الباقات",
    navCharter: "الميثاق القانوني",
    registerExpedition: "التسجيل في البعثة",
    requestBriefing: "طلب إحاطة للمؤسسات",
    heroKicker: "البعثة الأولى للتحقق الميداني وسلسلة التوريد في شرق إفريقيا",
    heroHeadline: "لا تقم بتحويل دولار واحد قبل أن تعاين سلسلة التوريد ميدانياً.",
    heroSubheadline: "البعثة الميدانية الوحيدة لمكافحة الاحتيال والتحقق القانوني عبر هيكل تجارة الذهب في شرق إفريقيا.",
    nonTransactionGuaranteeTitle: "ضمان عدم التعامل التجاري الصارم",
    nonTransactionGuaranteeDesc: "نحن لا نبيع الذهب ولا نتوسط في الصفقات. مهمتنا الحصرية هي التحقيق الجنائي لسلسلة التوريد ومكافحة التزييف.",
    viewPackages: "استعراض باقات البعثة",
    marketRealityTitle: "واقع السوق والفروقات الإحصائية",
    marketRealitySubtitle: "معلومات استخباراتية حول ممرات تجارة الذهب بمليارات الدولارات وشبكات التزوير.",
    itineraryTitle: "جدول الإبحار الميداني لـ 7 أيام",
    itinerarySubtitle: "من السجل السيادي للمعادن إلى المناجم الحرفية ومختبرات الفحص المعتمدة.",
    scamToolTitle: "مصفوفة فحص عروض الذهب المشبوهة",
    scamToolSubtitle: "تحليل وتفكيك مؤشرات الاحتيال الأكثر شيوعاً في عقود الذهب المزيفة.",
    packagesTitle: "فئات وباقات المشاركة",
    packagesSubtitle: "مخصصة للمتداولين المعتمدين، ومديري صناديق الثروة، والمستشارين القانونيين.",
    charterTitle: "الميثاق القانوني والامتثال",
    charterSubtitle: "مرتكزة على قانون التعدين الأوغندي لعام 2022 ومعايير ICGLR وتوجيهات OECD.",
    kycNotice: "تنويه: يتم تخصيص مبلغ 1,000 دولار أمريكي كرسوم تدقيق أمني وسيادي (KYC) وهي رسوم غير قابلة للاسترداد."
  },
  ZH: {
    brandName: "乌干达黄金供应链实地考察团",
    navExpedition: "考察介绍",
    navFoodChain: "供应链生态",
    navScamImmunity: "防诈体系",
    navPackages: "考察方案",
    navCharter: "法定合规",
    registerExpedition: "注册考察席位",
    requestBriefing: "预约企业私享简报",
    heroKicker: "东非顶级黄金实物供应链尽职调查与防欺诈考察",
    heroHeadline: "在亲眼核验完整供应链前，切勿电汇任何资金。",
    heroSubheadline: "全球唯一深入东非黄金贸易底层架构的实地反欺诈与尽职调查高级考察体系。",
    nonTransactionGuaranteeTitle: "严格非交易独立承诺",
    nonTransactionGuaranteeDesc: "我们坚决不销售任何黄金、不担任经纪人、不收取交易回扣。唯一职能是供应链实地法证、防诈核验与独立尽调。",
    viewPackages: "查看考察方案",
    marketRealityTitle: "市场真相与数据透视",
    marketRealitySubtitle: "揭秘东非每月数亿美元黄金中转枢纽与文书造假产业链的真实生态。",
    itineraryTitle: "7天深度实地考察行程",
    itinerarySubtitle: "从国家地质矿业局、金矿实地到保税精炼厂与税务海关全流程核查。",
    scamToolTitle: "黄金交易防诈风控矩阵",
    scamToolSubtitle: "输入可疑报价参数，精准拆解套路与虚假法律文书陷阱。",
    packagesTitle: "考察方案与席位",
    packagesSubtitle: "名额受限，仅面向合格大宗商品交易商、家族办公室及合规机构法务。",
    charterTitle: "合规准则与法定章程",
    charterSubtitle: "依据乌干达《2022年矿业与矿产法》、大湖区ICGLR追溯机制及OECD尽职调查指南。",
    kycNotice: "重要提示：定金中包含 1,000 美元用于主权级背景穿透审查（KYC）及政府合规登记，此款项严格不予退还。"
  },
  FR: {
    brandName: "EXPÉDITION OR OUGANDA",
    navExpedition: "L'Expédition",
    navFoodChain: "La Chaîne Réelle",
    navScamImmunity: "Immunité Anti-Fraude",
    navPackages: "Forfaits",
    navCharter: "Charte Légale",
    registerExpedition: "S'inscrire à l'Expédition",
    requestBriefing: "Briefing B2B Confidentiel",
    heroKicker: "L'EXPÉDITION DE DUE DILIGENCE N°1 EN AFRIQUE DE L'EST",
    heroHeadline: "NE TRANSFÉREZ PAS UN SEUL DOLLAR AVANT D'AVOIR PARCOURU LA CHAÎNE D'APPROVISIONNEMENT.",
    heroSubheadline: "L'unique expédition mondiale de vérification forensic et anti-fraude au cœur du négoce d'or en Afrique de l'Est.",
    nonTransactionGuaranteeTitle: "GARANTIE STRICTE DE NON-TRANSACTION",
    nonTransactionGuaranteeDesc: "Nous ne vendons aucun or et n'agissons pas en tant que courtiers. Notre seul mandat est la vérification indépendante et l'intelligence forensic.",
    viewPackages: "Découvrir les Forfaits",
    marketRealityTitle: "Réalités du Marché & Disparités",
    marketRealitySubtitle: "Intelligence forensic sur les couloirs de transit et l'industrie de la contrefaçon documentaire.",
    itineraryTitle: "Itinéraire d'Immersion sur 7 Jours",
    itinerarySubtitle: "Du cadastre souverain aux concessions artisanales et fonderies accréditées.",
    scamToolTitle: "Matrice d'Immunité Anti-Arnaque",
    scamToolSubtitle: "Déconstruisez les offres douteuses avant d'engager vos capitaux.",
    packagesTitle: "Forfaits & Niveaux d'Expédition",
    packagesSubtitle: "Accès strictement réservé aux traders accrédités, directions juridiques et family offices.",
    charterTitle: "Charte de Conformité Légale",
    charterSubtitle: "Conforme à la Loi Minière Ougandaise 2022, aux normes ICGLR et aux directives de l'OCDE.",
    kycNotice: "Avis Important : 1 000 USD de votre acompte sont alloués aux vérifications régaliennes KYC et habilitations de sécurité ministérielles, strictement non remboursables."
  }
};
