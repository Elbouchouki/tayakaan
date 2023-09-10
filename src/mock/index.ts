import { getRandomSubArray } from "@/lib/utils";
import { AssessmentObjectives, AssessmentScope, Control, Category, Evidence, FQA, Framework, KnowledgeBase, KnowledgeBaseData, Label, MaturityLevel, ObjectiveTypesObject, Policy, RiskStatus, ScopeStatusObject, ScopeTypes, ScopeTypesObject, Select, Tag, Tenant, User } from "@/types";
import evidenceJson from "@/data/evidence.json"
import frameworksJson from "@/data/frameworks.json"
import controlCategoryJson from "@/data/controlCategory.json"
import controlJson from "@/data/controls.json"
import AssessmentObjectiveJson from "@/data/assessmentObjective.json"

const UUID = () => Math.random().toString(36).substr(2, 9)

function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}
// export type ObjectiveTypes = "Met" | "Not Met" | "Not Applicable" | "Compensating Control"

export const OBJECTIVE_TYPES_MOCK: ObjectiveTypesObject[] = [
  {
    label: "Met",
    value: "Met"
  }, {
    label: "Not Met",
    value: "Not Met"
  }, {
    label: "Not Applicable",
    value: "Not Applicable"
  }, {
    label: "Compensating Control",
    value: "Compensating Control"
  }
]
export const OBJECTIVE_TYPES_MOCK_AR: ObjectiveTypesObject[] = [
  {
    label: "ملتقى",
    value: "Met"
  }, {
    label: "غير ملتقى",
    value: "Not Met"
  }, {
    label: "غير قابل للتطبيق",
    value: "Not Applicable"
  }, {
    label: "تحكم تعويضي",
    value: "Compensating Control"
  }
]
export const GET_OBJECTIVE_TYPES = (lang: "ar" | "en" | undefined) => lang === "ar" ? OBJECTIVE_TYPES_MOCK_AR : OBJECTIVE_TYPES_MOCK

export const ROLES: Select[] = [
  {
    label: "Admin",
    value: "Admin",
  }, {
    label: "Auditor",
    value: "Auditor",
  }, {
    label: "Risk Manager",
    value: "RiskManager",
  }, {
    label: "Compliance Professional",
    value: "ComplianceProfessional",
  }
]

export const AuthenticatedUserMock: User = {
  firstName: 'Ahmed',
  lastName: "Elbouchouki",
  email: "elbouchoukigamer@gmail.com",
  displayName: "Elbouchouki Ahmed",
  avatar: "/avatars/avatar3.png",
  id: UUID(),
  role: "Admin",
  active: true,
  tenant: "tenant-2",
  created_at: new Date(),
  updated_at: new Date(),
}

export const USERS_MOCK: User[] = [
  AuthenticatedUserMock,
  {
    firstName: 'John',
    lastName: "Doe",
    email: "john.doe@gmail.com",
    displayName: "John Doe",
    avatar: "/avatars/avatar2.png",
    id: UUID(),
    role: "Compliance Professional",
    active: true,
    tenant: "tenant-1",
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    firstName: 'Bob',
    lastName: "Marly",
    email: "bob.marly@gmail.com",
    displayName: "Bob Marly",
    avatar: "/avatars/avatar1.png",
    id: UUID(),
    role: "Risk Manager",
    active: false,
    tenant: "tenant-2",
    created_at: new Date(),
    updated_at: new Date(),
  }
]


export const TAG_MOCK: Tag[] = [
  {
    id: UUID(),
    name: "tag 1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 2",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 3",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 4",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 5",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "tag 6",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export const EVIDENCE_MOCK: Evidence[] = evidenceJson.map((evidence) => ({
  id: UUID(),
  name: evidence.name,
  reference: evidence.ref,
  description: evidence.description,
  content: evidence.content,
  created_at: new Date(),
  updated_at: new Date(),
})
)

export const ASSASSEMENET_OBJECTIVE_MOCK: AssessmentObjectives[] = AssessmentObjectiveJson.map((Assessment) => ({
  id: Assessment.id,
  controlId: Assessment.controlId,
  objective: Assessment.objective
}))


const additional_info = `
<p>Vendor recommendations are a critical aspect of complying with the PCI DSS framework. When an organization handles credit card data, it often relies on various vendors for technology and services that may interact with or impact the security of this sensitive information. To ensure compliance with PCI DSS, organizations should consider the following vendor-related recommendations:</p>
<span><strong>Vendor Selection:</strong> Choose vendors carefully. Prioritize vendors who understand PCI DSS requirements and can demonstrate compliance with them. Assess their security practices and policies before engaging their services.</span>
<span><strong>Vendor Due Diligence:</strong> Conduct thorough due diligence on potential vendors. This includes assessing their security controls, performing background checks, and reviewing their track record with regard to data breaches or security incidents.</span>
<span><strong>Contractual Obligations:</strong> Include specific PCI DSS compliance requirements in vendor contracts. Clearly define each party's responsibilities for maintaining security controls and compliance.</span>
<span><strong>Regular Assessments:</strong> Implement a process for regularly assessing vendor compliance with PCI DSS. This may involve on-site audits, reviewing their security documentation, and ensuring they adhere to agreed-upon security standards.</span>
<span><strong>Third-Party Validation:</strong> Consider using third-party assessors to verify a vendor's compliance with PCI DSS. This can provide an objective assessment of their security measures.</span>
<span><strong>Incident Response:</strong> Ensure that vendors have robust incident response plans in place. In the event of a data breach or security incident involving credit card data, it's vital that vendors respond swiftly and effectively to mitigate any potential damage.</span>
<span><strong>Data Handling:</strong> Clearly define how vendors should handle credit card data. This includes encryption, secure transmission, and secure storage practices. Ensure that vendors are only given access to the data they need to perform their services.</span>
<span><strong>Security Patching:</strong> Ensure that vendors promptly apply security patches and updates to their systems and software to protect against known vulnerabilities.</span>
<span><strong>Monitoring and Logging:</strong> Collaborate with vendors to establish robust monitoring and logging practices. This helps detect and respond to security threats promptly.</span>
<span><strong>Incident Reporting:</strong> Require vendors to report security incidents or breaches promptly. A clear communication channel should be established to ensure that any issues are addressed swiftly.</span>
<span><strong>Compliance Documentation:</strong> Collect and retain documentation from vendors that demonstrates their ongoing compliance with PCI DSS. This can include attestation of compliance (AoC) reports or other relevant documentation.</span>
<span><strong>Contingency Planning:</strong> Develop contingency plans in case a vendor fails to meet PCI DSS requirements or experiences a security breach. These plans should include steps to mitigate risks and transition to alternative vendors if necessary.</span>
<span><strong>Education and Training:</strong> Educate vendors about the importance of PCI DSS compliance and provide training on security best practices, especially if they handle credit card data.</span>
<p>In summary, effective management of vendor relationships is a crucial element of PCI DSS compliance. By selecting, monitoring, and collaborating with vendors who prioritize security and compliance, organizations can significantly reduce the risk of data breaches and maintain the security of credit card data in accordance with PCI DSS requirements.</p>
`

export const FRAMWORK_MOCK: Framework[] = frameworksJson.map((framework) => ({
  id: UUID(),
  name: framework.name,
  description: framework.name + " framework is a set of security controls designed for startups to quickly and effectively set up their environment. The controls are rather opinionated and will suggest specific tooling. The tooling and environment recommendations are not required, but the standard is designed to reduce the amount of decisions that a startup must make. The controls are also roughly in order and it is recommended to start with control 1 (e.g. ssf1) and go down the list. The order is not mandatory but it makes the most sense for dependencies. There are a total of 20 controls in the framework and if all 20 controls are completed, your security risk will be greatly reduced. The SSF framework also works nicely with other large name frameworks such as CSC, NIST, CMMC (in other words, there is nothing in SSF that would be frowned upon in other frameworks). ",
  additional_information: additional_info,
  created_at: new Date(),
  updated_at: new Date(),
  // controls: getRandomSubArray(CONTROLE_MOCK, Math.floor(Math.random() * CONTROLE_MOCK.length)),
}
))

// MATURITY LEVELS //
export const MATURITY_LEVELS_MOCK: MaturityLevel[] = [
  {
    id: "Unanswered",
    label: "Unanswered",
    value: "unanswered",
    color: "bg-gray-500 hover:bg-gray-600",
    description: ""
  },
  {
    id: "L0",
    label: "Not Performed",
    value: "notPerformed",
    color: "bg-red-500 hover:bg-red-600",
    description: "Practices are non-existent. A reasonable person would conclude the control is not being performed."
  },
  {
    id: "L1",
    label: "Performed Informally",
    value: "performedInformally",
    color: "bg-yellow-500 hover:bg-yellow-600",
    description: "Practices are “ad hoc” where the intent of the control is not met due to a lack of consistency and formality. A reasonable person would conclude the control is not consistently performed in a structured manner. "
  },
  {
    id: "L2",
    label: "Planned & Tracked",
    value: "plannedAndTracked",
    color: "bg-green-500 hover:bg-green-600",
    description: "Practices are “requirements-driven” where the intent of control is met in some circumstances, but not standardized across the entire organization."
  },
  {
    id: "L3",
    label: "Well Defined",
    value: "wellDefined",
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Practices are standardized “enterprise-wide” where the control is well-defined and standardized across the entire organization. "
  },
  {
    id: "L4",
    label: "Quantitatively Controlled",
    value: "quantitativelyControlled",
    color: "bg-indigo-500 hover:bg-indigo-600",
    description: "Practices are “metrics-driven” where the control builds on L3 maturity, but has detailed metrics to enable governance oversight. "
  },
  {
    id: "L5",
    label: "Continuously Improving",
    value: "continuouslyImproving",
    color: "bg-purple-500 hover:bg-purple-600",
    description: "Practices are “world-class” where the control builds on L4 maturity, but is continuously improving through automation (e.g., AI, machine learning, etc.) "
  }
]
export const MATURITY_LEVELS_MOCK_AR: MaturityLevel[] = [
  {
    id: "Unanswered",
    label: "بدون إجابة",
    value: "unanswered",
    color: "bg-gray-500 hover:bg-gray-600",
    description: ""
  },
  {
    id: "L0",
    label: "غير منجز",
    value: "notPerformed",
    color: "bg-red-500 hover:bg-red-600",
    description: "الممارسات غير موجودة. سيستنتج الشخص العاقل أن الرقابة لا تتم بالفعل"
  },
  {
    id: "L1",
    label: "تنفيذ عشوائي",
    value: "performedInformally",
    color: "bg-yellow-500 hover:bg-yellow-600",
    description: "الممارسات هي 'عشوائية' حيث لا يتم تحقيق نية الرقابة بسبب عدم وجود الاستمرارية والصياغة. سيستنتج الشخص العاقل أن الرقابة لا تُنفَّذ بانتظام بطريقة منهجية"
  },
  {
    id: "L2",
    label: "مخططة ومتتبعة",
    value: "plannedAndTracked",
    color: "bg-green-500 hover:bg-green-600",
    description: "الممارسات هي 'مدفوعة بالمتطلبات' حيث يتم تحقيق نية الرقابة في بعض الحالات، ولكنها ليست موحدة عبر المؤسسة بأكملها"
  },
  {
    id: "L3",
    label: "محددة بشكل جيد",
    value: "wellDefined",
    color: "bg-blue-500 hover:bg-blue-600",
    description: "الممارسات موحدة على مستوى المؤسسة حيث يتم تحديد الرقابة جيدًا وتوحيدها عبر المؤسسة بأكملها"
  },
  {
    id: "L4",
    label: "تحكم بشكل كمي",
    value: "quantitativelyControlled",
    color: "bg-indigo-500 hover:bg-indigo-600",
    description: "الممارسات مدفوعة بالمقاييس حيث تعتمد الرقابة على نضوج المستوى L3، ولكنها تحتوي على مقاييس مفصلة لتمكين الرقابة والإشراف"
  },
  {
    id: "L5",
    label: "تحسين مستمر",
    value: "continuouslyImproving",
    color: "bg-purple-500 hover:bg-purple-600",
    description: "الممارسات على مستوى 'عالمي' حيث تعتمد الرقابة على نضوج المستوى L4، ولكنها تتطور باستمرار من خلال التلقائية (مثل الذكاء الاصطناعي وتعلم الآلة وغيرها)"
  }
]
export const GET_MATURITY_LEVELS = (lang: "ar" | "en" | undefined) => lang === "ar" ? MATURITY_LEVELS_MOCK_AR : MATURITY_LEVELS_MOCK
// --------------- //
export const RISK_STATUS: RiskStatus[] = [
  {
    id: UUID(),
    value: "Avoidance"
  },
  {
    id: UUID(),
    value: "Mitigation"
  },
  {
    id: UUID(),
    value: "Transfer"
  },
  {
    id: UUID(),
    value: "Acceptance"
  },
  {
    id: UUID(),
    value: "Triggered"
  },
  {
    id: UUID(),
    value: "Closed"
  },
  {
    id: UUID(),
    value: "Other"
  },
];

export const CATEGORY: Category[] = [
  {
    id: UUID(),
    value: "Business & Strategic",
    subCategory: [{
      id: UUID(),
      value: "Commercial",
    }, {
      id: UUID(),
      value: "Reputation",
    }, {
      id: UUID(),
      value: "Stakeholder",
    }, {
       id: UUID(),
      value: "Technology & Obsolescence",
    }, {
       id: UUID(),
      value: "Lawsuit",
    }, {
      id: UUID(),
      value: "Product Recall",
    }, {
      id: UUID(),
      value: "Negative Publicity",
    }]
  },
  {
    id: UUID(),
    value: "Environmental & Tornadoes",
    subCategory: [{
      id: UUID(),
      value: "Hurricanes & Tornadoes",
    }, {
      id: UUID(),
      value: "High Winds",
    }, {
      id: UUID(),
      value: "Plate Tectonics",
    }, {
       id: UUID(),
      value: "Earthquake",
    }, {
       id: UUID(),
      value: "Building Strength",
    }, {
      id: UUID(),
      value: "Asteroids",
    }, {
      id: UUID(),
      value: "Volcanoes",
    }, {
      id: UUID(),
      value: "Radioactive Decay",
    }, {
      id: UUID(),
      value: "Radiation",
    }, {
      id: UUID(),
      value: "Asbestos",
    }, {
      id: UUID(),
      value: "Ground Water",
    }, {
      id: UUID(),
      value: "Sea Level",
    }, {
      id: UUID(),
      value: "Coastal Erosion",
    }]
  },
  {
    id: UUID(),
    value: "Project",
    subCategory: [{
      id: UUID(),
      value: "Scope Risks",
    }, {
      id: UUID(),
      value: "Schedule Risks",
    }, {
      id: UUID(),
      value: "Resource Risks",
    }, {
       id: UUID(),
      value: "Stakeholder Risks",
    }]
  },
  {
    id: UUID(),
    value: "Compliance",
    subCategory: [{
      id: UUID(),
      value: "Legal"
    }, {
      id: UUID(),
      value: "Regulatory"
    }, {
      id: UUID(),
      value: "Environmental"
    }, {
      id: UUID(),
      value: "Ethical"
    }, {
      id: UUID(),
      value: "Workplace Health & Safety"
    }, {
      id: UUID(),
      value: "Corrupt Practice"
    }, {
      id: UUID(),
      value: "Social Responsibility"
    }, {
      id: UUID(),
      value: "Quality"
    }, {
      id: UUID(),
      value: "Process"
    }]
  },
  {
    id: UUID(),
    value: "Financial",
    subCategory: [{
      id: UUID(),
      value: "Budget"
    }, {
      id: UUID(),
      value: "Cost"
    }, {
      id: UUID(),
      value: "Funding"
    }, {
      id: UUID(),
      value: "Economic"
    }, {
      id: UUID(),
      value: "Credit"
    }, {
      id: UUID(),
      value: "Insurance"
    }, {
      id: UUID(),
      value: "Pension"
    }, {
      id: UUID(),
      value: "Market"
    }]
  },
  {
    id: UUID(),
    value: "Operational & Infrastructure",
    subCategory: [{
      id: UUID(),
      value: "People"
    }, {
      id: UUID(),
      value: "Systems & Equipment"
    }, {
      id: UUID(),
      value: "Legal & Compliance"
    }, {
      id: UUID(),
      value: "Security"
    }, {
      id: UUID(),
      value: "Project"
    }, {
      id: UUID(),
      value: "External Events"
    }, {
      id: UUID(),
      value: "Business Processes"
    }, {
      id: UUID(),
      value: "External",
      subCategory: [{
        id: UUID(),
        value: "Political"
      },
      {
        id: UUID(),
        value: "Natural Disaster"
      },
      {
        id: UUID(),
        value: "Market"
      },
      {
        id: UUID(),
        value: "Technological"
      }]
    }]
  }
]

export const IMPACT = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
]


export const CONTROLE_MOCK: Control[] = controlJson.map((control) => {
  const m = MATURITY_LEVELS_MOCK[Math.floor(Math.random() * MATURITY_LEVELS_MOCK.length)]
  return {
    id: control.id,
    name: control.name,
    description: control.description,
    methods: control.methods,
    question: control.question,
    category: control.category,
    targetMaturity: MATURITY_LEVELS_MOCK[Math.floor(Math.random() * MATURITY_LEVELS_MOCK.length)],
    maturityFilter: m.value,
    maturity: {
      id: "Unanswered",
      label: "Unanswered",
      value: "unanswered",
      description: ""
    },
    framework: FRAMWORK_MOCK[Math.floor(Math.random() * FRAMWORK_MOCK.length)].id,
    Assessments: ASSASSEMENET_OBJECTIVE_MOCK.filter((Assessment) => Assessment.controlId === control.id),
    updatedAt: generateRandomDate(new Date(new Date().setDate(new Date().getDate() - 10)), new Date()),
    group: control.group,
    weight: control.weight
  }
})

// TODO: Randomized values to be changed to real (no solution found for the moment)
FRAMWORK_MOCK.forEach((framework) => {
  framework.controls = CONTROLE_MOCK.filter((control) => control.framework === framework.id)
})

export const POLICIES_MOCK: Policy[] = [
  {
    id: UUID(),
    name: "Media",
    description: "Content for the media policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "Confidentiality",
    description: "Content for the confidentiality policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: UUID(),
    name: "Incident",
    description: "Content for the confidentiality policy",
    content: `
    <h2>Purpose and Scope</h2><p><br></p><ul><li>This removable media, cloud storage and Bring Your Own Device (BYOD) policy defines the objectives, requirements and implementing instructions for storing data on removable media, in cloud environments, and on personally-owned devices, regardless of data classification level.</li></ul><p><br></p><ul><li>This policy applies to all information and data within the organization’s information security program, as well as all removable media, cloud systems and personally-owned devices either owned or controlled by the organization.</li></ul><p><br></p><ul><li>This policy applies to all users of information systems within the organization. This typically includes employees and contractors, as well as any external parties that come into contact with systems and information controlled by the organization (hereinafter referred to as “users”). This policy must be made readily available to all users.</li></ul>
    `,
    created_at: new Date(),
    updated_at: new Date(),
  }
]
export const LABELS_MOCK: Label[] = [
  {
    id: UUID(),
    key: "policy_label_security_email",
    value: "Policy - Security - Email",
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: UUID(),
    key: "policy_label_confidentiality",
    value: "Policy - Confidentiality",
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: UUID(),
    key: "policy_label_security",
    value: "Policy - Security",
    created_at: new Date(),
    updated_at: new Date(),
  }
]
export const TENANTS_MOCK: Tenant[] = [
  {
    reference: "REF-0001",
    id: "tenant-1",
    name: "Tenant 1",
    contact_email: "ebouchoukigamer@gmail.com",
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    reference: "tenant-2",
    id: "tenant-2",
    name: "Tenant 2",
    contact_email: "ebouchoukigamer@gmail.com",
    created_at: new Date(),
    updated_at: new Date(),
  }
]
export const FQA_MOCK: FQA[] = [
  {
    question: "What is the primary purpose of the compliance app?",
    answer: "The compliance app is a powerful SaaS solution designed to help organizations effectively manage and maintain compliance with various industry regulations and internal policies. It enables users to create and manage compliance frameworks, oversee multiple tenants or subsidiaries, and track compliance progress across various projects.",
    id: UUID()
  },
  {
    question: "How do I get started with the compliance app?",
    answer: "To begin using the compliance app, first sign up for an account on our website. After registration, you can access the app via the web portal or download our mobile app. Once logged in, you can create frameworks, add tenants, and start managing compliance projects.",
    id: UUID()
  },
  {
    question: "How often should I use the compliance app?",
    answer: "The frequency of app usage depends on your organization's specific needs and compliance requirements. Typically, users engage with the app regularly to monitor compliance progress, update frameworks, and manage projects effectively. We recommend ongoing use to stay aligned with changing compliance standards.",
    id: UUID()
  },
  {
    question: "Is the compliance app available on both iOS and Android?",
    answer: "Yes, the compliance app is accessible via web browsers and is also available for download on both iOS and Android platforms. This multi-platform accessibility ensures flexibility and convenience for users.",
    id: UUID()
  },
  {
    question: "Can I customize the compliance framework in the app?",
    answer: "Absolutely. The compliance app offers a high degree of customization. You can create, modify, and adapt compliance frameworks to meet the specific needs of your industry and organization. Tailoring frameworks allows you to address unique compliance requirements effectively.",
    id: UUID()
  },
  {
    question: "What types of compliance regulations does the app cover?",
    answer: "Our compliance app covers a comprehensive range of compliance regulations, including industry-specific standards, regional requirements, and international regulations. You can select and implement the frameworks that best suit your organization's compliance needs.",
    id: UUID()
  },
  {
    question: "Is my data secure when using the compliance app?",
    answer: "Data security is our top priority. The compliance app employs robust encryption protocols and adheres to industry best practices to ensure the confidentiality and integrity of your data. We regularly update our security measures to protect against emerging threats.",
    id: UUID()
  },
  {
    question: "How can I receive updates and notifications about compliance changes?",
    answer: "Stay informed with ease. The compliance app provides in-app notifications and also offers the option to subscribe to email alerts. These notifications will keep you up-to-date on compliance changes, ensuring that you can adapt your strategies promptly.",
    id: UUID()
  },
  {
    question: "Is there a dedicated support team available if I have questions or issues?",
    answer: "Absolutely. We have a dedicated support team available around the clock to assist you with any questions or issues you may encounter while using the app. You can reach out via email, phone, or our live chat support for immediate assistance.",
    id: UUID()
  },
  {
    question: "Can I export compliance reports from the app?",
    answer: "Yes, the compliance app provides robust reporting capabilities. You can generate comprehensive compliance reports and export them in various formats, such as PDF or CSV. These reports are invaluable for audits, presentations, and internal documentation.",
    id: UUID()
  }
]
export const ASSESSMENTS_SCOPE_STATUS: ScopeStatusObject[] = [
  {
    label: "Planned",
    value: "planned"
  }, {
    label: "In Progress",
    value: "in-progress"
  }, {
    label: "Completed",
    value: "completed"
  }
]
export const ASSESSMENTS_SCOPE_STATUS_AR: ScopeStatusObject[] = [
  {
    label: "مخطط",
    value: "planned"
  }, {
    label: "قيد التنفيذ",
    value: "in-progress"
  }, {
    label: "مكتمل",
    value: "completed"
  }
]
export const GET_ASSESSMENTS_SCOPE_STATUS = (lang: "ar" | "en" | undefined) => lang === "ar" ? ASSESSMENTS_SCOPE_STATUS_AR : ASSESSMENTS_SCOPE_STATUS

export const ASSESSMENTS_SCOPE_TYPES: ScopeTypesObject[] = [
  {
    label: "Internal",
    value: "internal"
  }, {
    label: "External",
    value: "external"
  }, {
    label: "Both",
    value: "both"
  }
]
export const ASSESSMENTS_SCOPE_TYPES_AR: ScopeTypesObject[] = [
  {
    label: "داخلي",
    value: "internal"
  }, {
    label: "خارجي",
    value: "external"
  }, {
    label: "كلاهما",
    value: "both"
  }
]
export const GET_ASSESSMENTS_SCOPE_TYPES = (lang: "ar" | "en" | undefined) => lang === "ar" ? ASSESSMENTS_SCOPE_TYPES_AR : ASSESSMENTS_SCOPE_TYPES

export const ASSESSMENTS_SCOPE_MOCK: AssessmentScope[] = [
  {
    id: UUID(),
    name: "Scope 1",
    description: "Scope 1 description",
    reportingFrom: new Date(),
    reportingTo: new Date(),
    status: "planned",
    type: "internal",
    controls: getRandomSubArray(FRAMWORK_MOCK, 2).flatMap((framework) => framework.controls)
  },
  {
    id: UUID(),
    name: "Scope 2",
    description: "Scope 2 description",
    reportingFrom: new Date(),
    reportingTo: new Date(),
    status: "in-progress",
    type: "external",
    controls: getRandomSubArray(FRAMWORK_MOCK, 2).flatMap((framework) => framework.controls)
  }
]


const knowledgeDataExample: KnowledgeBaseData[] = [
  {
    title: "Introduction to GRC Software",
    content:
      "GRC software helps organizations manage their governance, risk, and compliance processes efficiently. It integrates various functions to ensure that an organization's activities are aligned with its goals and meet regulatory requirements.",
  },
  {
    title: "Key Features of GRC Software",
    content:
      "GRC software typically includes features like policy management, risk assessment, compliance tracking, audit management, and reporting. These features help organizations streamline their GRC processes.",
  },
  {
    title: "Benefits of Implementing GRC Software",
    content:
      "Implementing GRC software can lead to improved risk management, better compliance with regulations, enhanced decision-making, increased transparency, and reduced operational inefficiencies.",
  },
  {
    title: "Common Challenges in GRC",
    content:
      "Organizations often face challenges in GRC, such as siloed data, complex regulations, and manual processes. GRC software aims to address these challenges by providing automation and centralization.",
  },
  {
    title: "Selecting the Right GRC Software",
    content:
      "When choosing GRC software, consider factors like your organization's specific needs, scalability, user-friendliness, integration capabilities, and vendor support.",
  },
  {
    title: "Implementing GRC Software Successfully",
    content:
      "A successful implementation of GRC software involves defining clear objectives, involving key stakeholders, training users, and continuously monitoring and improving your GRC processes.",
  },
  {
    title: "GRC Best Practices",
    content:
      "Adopting best practices in GRC includes establishing a risk-aware culture, regularly updating policies and procedures, conducting risk assessments, and staying updated with regulatory changes.",
  },
  {
    title: "GRC Software Vendors Comparison",
    content:
      "Compare popular GRC software vendors like RSA Archer, MetricStream, and ServiceNow GRC to find the one that aligns best with your organization's requirements.",
  },
  {
    title: "Case Studies",
    content:
      "Explore case studies of organizations that successfully implemented GRC software to manage their compliance, risk, and governance effectively.",
  },
]

const knowledgeDataExample_AR: KnowledgeBaseData[] = [
  {
    title: "مقدمة في برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "تساعد برامج GRC المؤسسات في إدارة عمليات الحوكمة والمخاطر والامتثال بكفاءة. إنها تدمج وظائف متعددة لضمان أن نشاطات المؤسسة متماشية مع أهدافها وتلبي متطلبات التنظيم.",
  },
  {
    title: "الميزات الرئيسية لبرامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "تتضمن برامج GRC عادة ميزات مثل إدارة السياسات وتقييم المخاطر وتتبع الامتثال وإدارة التدقيق وإعداد التقارير. تساعد هذه الميزات المؤسسات في تبسيط عمليات GRC الخاصة بها.",
  },
  {
    title: "فوائد تنفيذ برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "يمكن أن يؤدي تنفيذ برامج GRC إلى تحسين إدارة المخاطر، والامتثال الأفضل للتنظيمات، وتعزيز عمليات اتخاذ القرار، وزيادة الشفافية، وتقليل عدم الكفاءة في التشغيل.",
  },
  {
    title: "التحديات الشائعة في مجال إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "غالبًا ما تواجه المؤسسات تحديات في مجال GRC، مثل البيانات المعزولة، والتنظيمات المعقدة، والعمليات اليدوية. تهدف برامج GRC إلى معالجة هذه التحديات من خلال توفير الأتمتة والتركيز المركزي.",
  },
  {
    title: "اختيار برامج إدارة المخاطر والامتثال والحوكمة (GRC) المناسبة",
    content: "عند اختيار برامج GRC، يجب أن تنظر في عوامل مثل احتياجات المؤسسة الخاصة بك، وقابلية التوسع، وسهولة الاستخدام، وقدرات التكامل، ودعم البائع.",
  },
  {
    title: "تنفيذ برامج إدارة المخاطر والامتثال والحوكمة (GRC) بنجاح",
    content: "يتضمن تنفيذ ناجح لبرامج GRC تحديد أهداف واضحة، وضم معنيين رئيسيين، وتدريب المستخدمين، ومراقبة وتحسين عمليات GRC الخاصة بك بشكل مستمر.",
  },
  {
    title: "أفضل الممارسات في مجال إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "تتضمن اعتماد أفضل الممارسات في مجال GRC إنشاء ثقافة توعية بالمخاطر، وتحديث السياسات والإجراءات بانتظام، وإجراء تقييمات للمخاطر، والبقاء على اطلاع دائم على التغييرات التنظيمية.",
  },
  {
    title: "مقارنة بين بائعي برامج إدارة المخاطر والامتثال والحوكمة (GRC)",
    content: "قارن بين بائعي برامج GRC الشهيرين مثل RSA Archer وMetricStream وServiceNow GRC للعثور على البائع الذي يتوافق بشكل أفضل مع متطلبات مؤسستك.",
  },
  {
    title: "دراسات الحالة",
    content: "استكشف دراسات الحالة للمؤسسات التي نفذت بنجاح برامج GRC لإدارة الامتثال والمخاطر والحوكمة بفعالية.",
  }]

export const KNOWLEDGE_BASE_MOCK: KnowledgeBase[] = [
  {
    title: "Maturity Levels",
    description: "Overview of maturity levels",
    image: "/images/maturity_levels.jpg",
    id: "maturity_levels",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "Security & Privacy Capability Maturity Model (SP-CMM)",
    description:
      "Thank you for showing interest in the Secure Controls Framework’s™ Security & Privacy Capability...",
    image: "/images/security.png",
    id: "security",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "List Of Known Issues",
    description:
      "Thank you for being an early adopter of Tayakaan. Here you can find the full list of currently known issues.",
    image: "/images/issues.png",
    id: "issues",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
  {
    title: "Implementation Statuses",
    description: "Overview of Implementation Statuses in Tayakaan",
    image: "/images/statuses.png",
    id: "statuses",
    data: knowledgeDataExample,
    lastUpdate: new Date()
  },
];

export const KNOWLEDGE_BASE_MOCK_AR: KnowledgeBase[] = [
  {
    title: "مستويات النضوج",
    description: "نظرة عامة على مستويات النضوج",
    image: "/images/maturity_levels.jpg",
    id: "maturity_levels",
    data: knowledgeDataExample_AR,
    lastUpdate: new Date()

  }, {
    title: "نموذج نضوج قدرات الأمن والخصوصية ",
    description: "شكرا لاهتمامك بإطار الضوابط الآمنة ™ لقدرات الأمن والخصوصية",
    image: "/images/security.png",
    id: "security",
    data: knowledgeDataExample_AR,
    lastUpdate: new Date()

  }, {
    title: "قائمة المشاكل المعروفة",
    description: "شكرًا لك على أنك كنت مبكرًا في اعتماد تياكان. هنا يمكنك العثور على القائمة الكاملة للمشكلات المعروفة حاليًا",
    image: "/images/issues.png",
    id: "issues",
    data: knowledgeDataExample_AR,
    lastUpdate: new Date()

  }, {
    title: "حالات التنفيذ",
    description: "نظرة عامة على حالات التنفيذ في تياكان",
    image: "/images/statuses.png",
    id: "statuses",
    data: knowledgeDataExample_AR,
    lastUpdate: new Date()

  }
]

export const GET_KNOWLEDGE_BASE = (lang: "ar" | "en" | undefined) => lang === "ar" ? KNOWLEDGE_BASE_MOCK_AR : KNOWLEDGE_BASE_MOCK