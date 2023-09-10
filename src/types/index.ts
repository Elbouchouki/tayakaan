import { string, z } from "zod"

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string(),
  email: z.string(),
  avatar: z.string(),
  id: z.string(),
  role: z.string(),
  tenant: z.optional(z.string()),
  active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const policySchema = z.object({
  reference: z.string().optional(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})


export const evidanceSchema = z.object({
  reference: z.string().optional(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const controlCategory = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
})

export const subControlCategory = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
})

export const subControl = z.object({
  reference: z.string().optional(),
  id: z.string(),
  name: z.string(),
  owner: z.optional(userSchema),
  operator: z.optional(userSchema),

  todoTotal: z.string(),
  todoCompleted: z.string(),

  progress: z.number().optional(),

  applicable: z.boolean(),

  evidences: z.array(evidanceSchema).optional(),
  context: z.string().optional(),
  feedback: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),

  created_at: z.date(),
  updated_at: z.date(),
})

export type ObjectiveTypes = "Met" | "Not Met" | "Not Applicable" | "Compensating Control"

export type ObjectiveTypesObject = {
  label: string
  value: ObjectiveTypes
}

export const AssessmentObjectivesSchema = z.object({
  controlId: z.string(),
  id: z.string(),
  objective: z.string(),
  choices: z.string().optional(),
  explination: z.string().optional(),
})


export const maturityLevelSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  description: z.string(),
  color: z.optional(z.string()),
})

export const controlSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  methods: z.string(),
  question: z.string(),
  maturityFilter: z.optional(z.string()),
  targetMaturity: maturityLevelSchema.optional(),
  maturity: maturityLevelSchema.optional(),
  Assessments: z.array(AssessmentObjectivesSchema).optional(),
  framework: z.string().optional(),
  updatedAt: z.optional(z.date()),
  weight: z.number().optional(),
  group: z.string().optional(),
  remediationPlanText: z.string().optional(),
  notesText: z.string().optional(),
  policiesText: z.string().optional(),
  proceduresText: z.string().optional(),
  standardsText: z.string().optional(),
})


export const questionnairStatusSchema = z.object({
  name: z.string(),
  value: z.string(),
})

export const questionnaireSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  submited: z.boolean(),
  published: z.boolean(),
  vendor: z.string(),
  enabled: z.boolean(),
  status: questionnairStatusSchema,
  created_at: z.date(),
  updated_at: z.date(),
})

export const labelSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const frameworkSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  additional_information: z.string(),
  controls: z.array(controlSchema).optional(),
  created_at: z.date(),
  updated_at: z.date(),
})


export const tenantSchema = z.object({
  reference: z.string().optional(),
  id: z.string(),
  name: z.string(),
  contact_email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})


export type ScopeTypes = "internal" | "external" | "both"

export type ScopeTypesObject = {
  label: string
  value: ScopeTypes
}

export type ScopeStatus = "planned" | "in-progress" | "completed"

export type ScopeStatusObject = {
  label: string
  value: ScopeStatus
}

export const assessmentScope = z.object({
  id: z.string(),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  description: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),
  reportingFrom: z.date({
    required_error: "Reporting from is required"
  }),
  reportingTo: z.date({
    required_error: "Reporting to is required"
  }),
  controls: z.array(controlSchema).optional(),
  status: z.enum(["planned", "in-progress", "completed"], {
    required_error: "Status is required"
  }).optional(),
  type: z.enum(["internal", "external", "both"], {
    required_error: "Type is required"
  }),
})

export const RiskForm = z.object({
    id: z.string(),
    riskName: z.string().min(4, {
      message: "Risk Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: "description must be at least 4 characters.",
    }),
    consequences: z.string().min(4, {
      message: "Consequences must be at least 4 characters."
    }),
    dateRaised: z.date(),
    affectedAsset: z.string().min(4, {
      message: "Affect Asset must be at least 4 characters."
    }),
    category: z.string(),
    subcategory: z.string(),
    riskStatus: z.string(),
    impact: z.coerce.number(),
    likelihood: z.coerce.number(),
    owner: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    tags: z.array(tagSchema),
  })

export type SidebarItem = {
  key?: string,
  title?: string,
  icon?: React.ElementType,
  path?: string,
  children?: SidebarItem[],
}

export type Select = {
  label: string
  value: string
}

export type Risk = {
  id: string,
  dateRaised: Date,
  updatedDate: Date,
  riskName: string,
  description: string,
  consequences: string,
  affectedAsset: string,
  category: string,
  subcategory: string,
  riskStatus: string,
  impact: number,
  likelihood: number,
  owner: string,
  tags?: Tag[]
}

export type RiskStatus = {
  id:string,
  value: string,
}

export type Category = {
  id: string,
  value: string,
  subCategory?: Category[],
}

export type FQA = {
  question: string,
  answer: string
  id: string
}

export type Lang = {
  key: "ar" | "en",
  icon: string,
  text: string
}


export type KnowledgeBaseData = {
  title: string,
  content: string
}

export type KnowledgeBase = {
  id: string,
  title: string;
  description: string;
  image: string;
  data: KnowledgeBaseData[]
  lastUpdate: Date
}

export type Dictionnary = {
  light: string,
  dark: string,
  system: string,
  profile: string,
  settings: string,
  logout: string,
  connectedAs: string,
  quickLinks: string,
  home: string,
  riskManagement: string,
  riskManagementOverview: string,
  riskAssessment: string,
  riskRegister: string,
  compliance: string,
  complianceOverview: string,
  gapAssessment: string,
  gapAssessmentScope: string,
  controls: string,
  policies: string,
  evidence: string,
  questionnaires: string,
  frameworks: string,
  tags: string,
  labels: string,
  reports: string,
  tenants: string,
  users: string,
  help: string,
  knowledgeBase: string,
  fqa: string,
  createTenant: string,
  registerRisk: string,
  viewPolicies: string,
  viewControls: string,
  allRightsReserved: string,
  maturityLevelsDescription: string,
  controlCode: string,
  description: string,
  maturity: string,
  view: string,
  noResultsFound: string,
  resetFilters: string,
  search: string,
  selected: string,
  toggleColumns: string,
  clearFilters: string,
  backToAllQuestions: string,
  back: string,
  lastUpdate: string,
  maturityLevel: string,
  targetMaturityLevel: string,
  functionGrouping: string,
  domain: string,
  controlDescription: string,
  assessmentObjectives: string,
  assessmentObjectivesDescription: string,
  explanation: string,
  methodsToComply: string,
  noInformationAvailableForThisControl: string,
  notes: string,
  standard: string,
  procedures: string,
  informations: string,
  remediationPlan: string,
  save: string,
  discard: string,
  changesSavedCuccessfully: string,
  recentActions: string,
  quickAccess: string,
  status: string,
  type: string,
  reportingFrom: string,
  reportingTo: string,
  scopeName: string,
  edit: string,
  delete: string,
  assessmentAddedSuccessfully: string,
  assessmentUpdatedSuccessful: string,
  assessmentDeletedSuccessfully: string,
  addAssessment: string,
  addAssessmentDescription: string,
  editAssessment: string,
  name: string,
  pickDate: string,
  selectType: string,
  updateAssessment: string,
  asc: string,
  desc: string,
  hide: string,
  of: string,
  rowsSelected: string,
  rowsPerPage: string,
  page: string,
  goToFirstPage: string,
  goToPreviousPage: string,
  goToNextPage: string,
  goToLastPage: string,
  backToAllScopes: string,
  cancel: string,
  next: string,
  previous: string,
  from: string,
  to: string,
  controlsToBeAssessed: string,
  details: string,
  review: string,
  addTenant: string,
  updateTenant: string,
  addNewTenantToTheSystem: string,
  tenantAddedSuccessfully: string,
  tenantUpdatedSuccessfully: string,
  tenantDeletedSuccessfully: string,
  editTenant: string,
  reference: string,
  createDate: string,
  updateDate: string,
  created_at: string,
  updated_at: string,
  thisIsTheReferenceForTheTenant: string,
  contactEmail: string,
  exportingData: string,
  dataExported: string,
  errorExportingData: string,
  optional: string,
  tenantUsers: string,
  userAddedSuccessfully: string,
  userUpdatedSuccessfully: string,
  userDeletedSuccessfully: string,
  addTenantUser: string,
  editUser: string,
  addNewTenantUserToTheSystem: string,
  lastName: string,
  firstName: string,
  displayName: string,
  email: string,
  noTenantsAvailable: string,
  selectTenant: string,
  role: string,
  selectRole: string,
  enabled: string,
  addUser: string,
  active: string,
  updateUser: string,
  tenant: string,
  disabled: string,
  helpHeaderMsg: string,
  helpFooterMsg: string,
  frequentlyAskedAuestions: string,
  yourMessageHasBeenSentSuccessfully: string,
  weWillGetBackToYouAsSoonAsPossible: string,
  howCanweHelp: string,
  sendMessage: string,
  helpExample: string,
  open: string,
  evidenceCanBeAddedAndAssociatedWithControls: string,
  evidenceAddedSuccessfully: string,
  addEvidence: string,
  addNewEvidenceToTheSystem: string,
  thisIsTheReferenceForTheEvidence: string,
  content: string,
  attachement: string,
  updateEvidence: string,
  evidenceUpdatedSuccessfully: string,
  editEvidence: string,
  policiesCanBeAssociatedWithControls: string,
  policyAddedSuccessfully: string,
  policyUpdatedSuccessfully: string,
  policyDeletedSuccessfully: string,
  addPolicy: string,
  updatePolicy: string,
  editPolicy: string
  policy: string,
  addNewPolicyToTheSystem: string,
  thisIsTheReferenceForThePolicy: string,
  key: string,
  value: string,
  required: string,
  addLabel: string,
  updateLabel: string,
  labelUpdatedSuccessfully: string,
  editLabel: string,
  labelAddedSuccessfully: string,
  labelDeletedSuccessfully: string,
  addNewLabelToTheSystem: string,
  thisIsTheNameOfTheTag: string,
  addTag: string,
  updateTag: string,
  tagUpdatedSuccessfully: string,
  editTag: string,
  tagAddedSuccessfully: string,
  addNewTagToTheSystem: string,
  tagDeletedSuccessfully: string,
  id: string,
  tagsAllowYouToLogicallyGroupControlsPoliciesTogether: string,
  labelsAreVariablesThatAreUsedInYourPolicies: string,
  framework: string,
  FromSchemaValidation: {
    thisFieldCantBeEmpty: string,
    name: string,
    description: string,
    reportingFrom: string,
    reportingTo: string,
    status: string,
    type: string,
    framework: string,
    controls: string,
    invalidEmailAddress: string
    firstName: string,
    lastName: string,
    displayName: string,
    key: string,
    value: string,

  }
}

export type Tenant = z.infer<typeof tenantSchema>
export type User = z.infer<typeof userSchema>
export type Tag = z.infer<typeof tagSchema>
export type Policy = z.infer<typeof policySchema>

export type Evidence = z.infer<typeof evidanceSchema>
// export type SubControl = z.infer<typeof subControl>
export type Control = z.infer<typeof controlSchema>
export type AssessmentObjectives = z.infer<typeof AssessmentObjectivesSchema>
export type QuestionnaireStatus = z.infer<typeof questionnairStatusSchema>
export type Questionnaire = z.infer<typeof questionnaireSchema>
// export type Category = z.infer<typeof category>
export type Label = z.infer<typeof labelSchema>
export type Framework = z.infer<typeof frameworkSchema>
export type ControleCategory = z.infer<typeof controlCategory>
export type SubControleCategory = z.infer<typeof subControlCategory>
export type MaturityLevel = z.infer<typeof maturityLevelSchema>
export type AssessmentScope = z.infer<typeof assessmentScope>