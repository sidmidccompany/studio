
"use client";
import React, { useState } from 'react';
import { Search, Plus, User, FileText, Clipboard, Database, BarChart2, Settings, LogOut, ChevronDown, ChevronRight, Save, Printer, Download, Upload } from 'lucide-react';

// Main App Component
const App = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedCategories, setExpandedCategories] = useState({
    fertilizer: true,
    insecticide: false
  });
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category as keyof typeof expandedCategories]
    });
  };

  const navigateTo = (menu: string, form: string | null = null) => {
    setActiveMenu(menu);
    setSelectedForm(form);
  };

  const renderContent = () => {
    if (activeMenu === 'dashboard') return <Dashboard />;
    if (activeMenu === 'forms' && selectedForm) return <FormRenderer formType={selectedForm} />;
    if (activeMenu === 'forms') return <FormsCatalog navigateTo={navigateTo} />;
    if (activeMenu === 'submissions') return <Submissions />;
    if (activeMenu === 'reports') return <Reports />;
    if (activeMenu === 'settings') return <SettingsPanel />;
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Agri-Forms Portal</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <ul>
              <li className={`mb-2 ${activeMenu === 'dashboard' ? 'bg-blue-600 rounded' : ''}`}>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <BarChart2 size={18} className="mr-3" />
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => navigateTo('forms')}
                  className={`flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 ${activeMenu === 'forms' ? 'bg-blue-600' : ''}`}
                >
                  <span className="flex items-center">
                    <FileText size={18} className="mr-3" />
                    Forms
                  </span>
                </button>
                {activeMenu === 'forms' && (
                  <div className="ml-6 mt-2 space-y-1">
                    <div>
                      <button
                        onClick={() => toggleCategory('fertilizer')}
                        className="flex items-center w-full p-1 rounded hover:bg-gray-700"
                      >
                        {expandedCategories.fertilizer ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                        Fertilizer Forms
                      </button>
                      {expandedCategories.fertilizer && (
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'fertilizerLicense')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'fertilizerLicense' ? 'bg-gray-700' : ''}`}
                            >
                              Sale License Application
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'formA1')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'formA1' ? 'bg-gray-700' : ''}`}
                            >
                              Form A1 - Memorandum
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'inspectionFertilizer')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'inspectionFertilizer' ? 'bg-gray-700' : ''}`}
                            >
                              Inspection Report
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => toggleCategory('insecticide')}
                        className="flex items-center w-full p-1 rounded hover:bg-gray-700"
                      >
                        {expandedCategories.insecticide ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                        Insecticide Forms
                      </button>
                      {expandedCategories.insecticide && (
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'formV')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'formV' ? 'bg-gray-700' : ''}`}
                            >
                              Form V - Inspector Forms
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'formIV')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'formIV' ? 'bg-gray-700' : ''}`}
                            >
                              Form IV - Analyst Report
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => navigateTo('forms', 'inspectionInsecticide')}
                              className={`w-full p-1 rounded text-left hover:bg-gray-700 ${selectedForm === 'inspectionInsecticide' ? 'bg-gray-700' : ''}`}
                            >
                              Manufacturing Inspection
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </li>
              <li className={`mb-2 ${activeMenu === 'submissions' ? 'bg-blue-600 rounded' : ''}`}>
                <button
                  onClick={() => navigateTo('submissions')}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <Database size={18} className="mr-3" />
                  Submissions
                </button>
              </li>
              <li className={`mb-2 ${activeMenu === 'reports' ? 'bg-blue-600 rounded' : ''}`}>
                <button
                  onClick={() => navigateTo('reports')}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <Clipboard size={18} className="mr-3" />
                  Reports
                </button>
              </li>
              <li className={`mb-2 ${activeMenu === 'settings' ? 'bg-blue-600 rounded' : ''}`}>
                <button
                  onClick={() => navigateTo('settings')}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700">
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search forms..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [pendingCount, setPendingCount] = useState(12);
  const [processingAll, setProcessingAll] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleProcessAllPending = () => {
    setProcessingAll(true);
    // Simulate processing delay
    setTimeout(() => {
      setPendingCount(0);
      setProcessingAll(false);
      setSuccessMessage("All pending forms have been processed successfully!");
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    }, 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={handleProcessAllPending}
          disabled={pendingCount === 0 || processingAll}
          className={`px-4 py-2 rounded-lg text-white ${pendingCount === 0 || processingAll ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {processingAll ? (
            <>
              <span className="inline-block mr-2 animate-spin">⟳</span>
              Processing...
            </>
          ) : (
            "Process All Pending"
          )}
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Pending Forms" count={pendingCount.toString()} color="blue" />
        <DashboardCard title="Submitted Forms" count="60" color="green" />
        <DashboardCard title="Rejected Forms" count="3" color="red" />
        <DashboardCard title="Under Review" count="7" color="yellow" />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <ul className="space-y-4">
            {pendingCount === 0 ? (
              <ActivityItem
                action="Bulk Processed"
                form="All Pending Forms"
                time="Just now"
                status="processed"
              />
            ) : (
              <ActivityItem
                action="Submitted"
                form="Fertilizer Sale License Application"
                time="2 hours ago"
                status="pending"
              />
            )}
            <ActivityItem
              action="Approved"
              form="Form A1 - Memorandum of Intimation"
              time="Yesterday"
              status="approved"
            />
            <ActivityItem
              action="Returned for Correction"
              form="Insecticide Manufacturing Inspection"
              time="2 days ago"
              status="rejected"
            />
            <ActivityItem
              action="Updated"
              form="Form IV - Insecticide Analyst Report"
              time="3 days ago"
              status="updated"
            />
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Form Submission Statistics</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Chart Visualization Would Appear Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Card Component
interface DashboardCardProps {
  title: string;
  count: string;
  color: 'blue' | 'green' | 'red' | 'yellow';
}
const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, color }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center text-white`}>
          <FileText size={24} />
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};

// Activity Item Component
interface ActivityItemProps {
  action: string;
  form: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'updated' | 'processed';
}
const ActivityItem: React.FC<ActivityItemProps> = ({ action, form, time, status }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    updated: "bg-blue-100 text-blue-800",
    processed: "bg-purple-100 text-purple-800"
  };

  return (
    <li className="flex items-center justify-between">
      <div>
        <p className="font-medium">{action}: {form}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </li>
  );
};

// Forms Catalog Component
interface FormsCatalogProps {
  navigateTo: (menu: string, form: string | null) => void;
}
const FormsCatalog: React.FC<FormsCatalogProps> = ({ navigateTo }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Forms Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormCard
          title="Fertilizer Sale License Application"
          description="Application for obtaining new letter of Authorization (Sale License) for Self Manufactured/Imported fertilizers"
          onClick={() => navigateTo('forms', 'fertilizerLicense')}
        />
        <FormCard
          title="Form A1 - Memorandum of Intimation"
          description="Declaration form as per clause 8(2) of FCO 1985 for fertilizer registration"
          onClick={() => navigateTo('forms', 'formA1')}
        />
        <FormCard
          title="Fertilizer Manufacturing Inspection Report"
          description="Inspection report for fertilizer manufacturing units"
          onClick={() => navigateTo('forms', 'inspectionFertilizer')}
        />
        <FormCard
          title="Form V - Inspector Forms"
          description="Forms used by insecticide inspectors for sample collection, seizure notices, etc."
          onClick={() => navigateTo('forms', 'formV')}
        />
        <FormCard
          title="Form IV - Insecticide Analyst Report"
          description="Standard report format for analysis of insecticide samples by analysts"
          onClick={() => navigateTo('forms', 'formIV')}
        />
        <FormCard
          title="Insecticide Manufacturing Inspection"
          description="Proforma for inspection of insecticides manufacturing units"
          onClick={() => navigateTo('forms', 'inspectionInsecticide')}
        />
      </div>
    </div>
  );
};

// Form Card Component
interface FormCardProps {
  title: string;
  description: string;
  onClick: () => void;
}
const FormCard: React.FC<FormCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="text-blue-600 font-medium hover:text-blue-800">
          Fill Form →
        </button>
      </div>
    </div>
  );
};

// Form Renderer Component
interface FormRendererProps {
  formType: string;
}
const FormRenderer: React.FC<FormRendererProps> = ({ formType }) => {
  const [formData, setFormData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [pendingUpdateFields, setPendingUpdateFields] = useState<string[]>([]);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [showUpdateFields, setShowUpdateFields] = useState(false);

  // Simulated data - in a real app, this would come from API or props
  React.useEffect(() => {
    // If coming from an edit link, populate the form with existing data
    // This could be triggered by URL params or props
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isEdit = urlParams.get('edit') === 'true';

      if (isEdit) {
        setIsUpdate(true);
        // Simulate loading existing form data
        setFormData({
          fullName: "John Doe",
          aadharNumber: "1234 5678 9012",
          panNumber: "ABCDE1234F",
          education: "B.Sc. Agriculture",
          mobileNumber: "9876543210",
          email: "john.doe@example.com",
          address: "123 Farm Avenue, Agricultural District",
          businessName: "Green Fields Fertilizers",
          businessType: "proprietorship",
          registrationNumber: "REG123456",
          gstNumber: "GST9876543210",
          salePointAddress: "456 Market Street, Commercial Zone",
          storageAddress: "789 Warehouse Area, Industrial Zone",
          premisesOwnership: "owned",
          premisesSize: "2500",
          responsiblePersonName: "Jane Smith",
          responsiblePersonDesignation: "Operations Manager",
          responsiblePersonQualification: "M.Sc. Agricultural Science",
          responsiblePersonContact: "9876543211",
          paymentMethod: "challan",
          paymentReference: "PAY987654321",
          paymentDate: "2025-05-01",
          paymentAmount: "2250",
        });

        // Simulate fields that need updating
        setPendingUpdateFields([
          "responsiblePersonContact",
          "paymentReference",
          "storageAddress"
        ]);

        setIsPendingUpdate(true);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // If updating a field that was marked for update, remove it from the list
    if (pendingUpdateFields.includes(name)) {
      setPendingUpdateFields(pendingUpdateFields.filter(field => field !== name));
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    setIsPendingUpdate(false);
  };

  const handleSaveDraft = () => {
    // Logic to save draft
    alert("Form draft has been saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Logic to export form data
    alert("Form data has been exported successfully!");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderFormTitle = () => {
    switch(formType) {
      case 'fertilizerLicense':
        return "Fertilizer Sale License Application";
      case 'formA1':
        return "Form A1 - Memorandum of Intimation";
      case 'inspectionFertilizer':
        return "Fertilizer Manufacturing Inspection Report";
      case 'formV':
        return "Form V - Insecticide Inspector Forms";
      case 'formIV':
        return "Form IV - Insecticide Analyst Report";
      case 'inspectionInsecticide':
        return "Insecticide Manufacturing Inspection";
      default:
        return "Form";
    }
  };

  const FormToolbar = () => (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{renderFormTitle()}</h2>
        {formSubmitted ? (
          <span className="text-green-600 text-sm">Form {isUpdate ? "updated" : "submitted"} successfully!</span>
        ) : (
          <span className="text-gray-500 text-sm">
            {isUpdate ? "Please update the highlighted fields" : "Please fill out the form completely"}
          </span>
        )}
        {isPendingUpdate && (
          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            Pending Update
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          onClick={handleSaveDraft}
        >
          <Save size={16} className="mr-1" />
          Save Draft
        </button>
        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          onClick={handlePrint}
        >
          <Printer size={16} className="mr-1" />
          Print
        </button>
        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          onClick={handleExport}
        >
          <Download size={16} className="mr-1" />
          Export
        </button>
        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          <Upload size={16} className="mr-1" />
          Upload Documents
        </button>
      </div>
    </div>
  );

  // Helper to determine if a field needs update
  const needsUpdate = (fieldName: string) => {
    return isUpdate && pendingUpdateFields.includes(fieldName);
  };

  // Field wrapper that highlights fields needing update
  interface UpdateFieldWrapperProps {
    children: React.ReactNode;
    fieldName: string;
  }
  const UpdateFieldWrapper: React.FC<UpdateFieldWrapperProps> = ({ children, fieldName }) => {
    if (needsUpdate(fieldName)) {
      return (
        <div className="border-2 border-yellow-400 rounded p-1 relative">
          <div className="absolute -top-3 left-2 bg-yellow-100 text-yellow-800 text-xs px-1 rounded">
            Update Required
          </div>
          {children}
        </div>
      );
    }
    return children;
  };

  const renderFertilizerLicenseForm = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Form Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className={`w-1/3 text-center ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              Applicant Information
            </div>
            <div className={`w-1/3 text-center ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              Business Details
            </div>
            <div className={`w-1/3 text-center ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              Documents & Submission
            </div>
          </div>
          <div className="w-full h-1 bg-gray-200 mt-2">
            <div className="h-full bg-blue-600" style={{ width: `${(currentStep - 1) * 50}%` }}></div>
          </div>
        </div>

        {/* Show updates panel if this is an update */}
        {isUpdate && (
          <div className="mb-6 border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-blue-800">Form Update</h3>
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowUpdateFields(!showUpdateFields)}
              >
                {showUpdateFields ? "Hide Update Fields" : "Show Only Update Fields"}
              </button>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              This form has been returned for updates. Please review and update the highlighted fields.
            </p>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Update Comments</label>
              <textarea
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                rows={3}
                placeholder="Please provide comments about your updates"
                value={updateComment}
                onChange={(e) => setUpdateComment(e.target.value)}
              ></textarea>
            </div>
            {pendingUpdateFields.length > 0 && (
              <div className="mt-3">
                <span className="text-sm font-medium text-blue-700">Fields requiring update:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {pendingUpdateFields.map(field => (
                    <span key={field} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {pendingUpdateFields.length === 0 && (
              <div className="mt-3 text-green-600 text-sm font-medium">
                All required updates have been made.
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div>
          {(currentStep === 1 && (!showUpdateFields || pendingUpdateFields.some(field =>
            ['fullName', 'aadharNumber', 'panNumber', 'education', 'mobileNumber', 'email', 'address'].includes(field)
          ))) && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <UpdateFieldWrapper fieldName="fullName">
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.fullName || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                  <UpdateFieldWrapper fieldName="aadharNumber">
                    <input
                      type="text"
                      name="aadharNumber"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.aadharNumber || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <UpdateFieldWrapper fieldName="panNumber">
                    <input
                      type="text"
                      name="panNumber"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.panNumber || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Educational Qualification</label>
                  <UpdateFieldWrapper fieldName="education">
                    <input
                      type="text"
                      name="education"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.education || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <UpdateFieldWrapper fieldName="mobileNumber">
                    <input
                      type="tel"
                      name="mobileNumber"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.mobileNumber || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <UpdateFieldWrapper fieldName="email">
                    <input
                      type="email"
                      name="email"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
                <UpdateFieldWrapper fieldName="address">
                  <textarea
                    name="address"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.address || ''}
                    onChange={handleChange}
                  ></textarea>
                </UpdateFieldWrapper>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents to Upload (Self-attested)</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="aadharUpload" className="mr-2" />
                    <label htmlFor="aadharUpload" className="text-sm">Aadhar Card</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="panUpload" className="mr-2" />
                    <label htmlFor="panUpload" className="text-sm">PAN Card</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="educationUpload" className="mr-2" />
                    <label htmlFor="educationUpload" className="text-sm">Education Qualification Document</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="photoUpload" className="mr-2" />
                    <label htmlFor="photoUpload" className="text-sm">I-card Size Recent Photo</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="signatureUpload" className="mr-2" />
                    <label htmlFor="signatureUpload" className="text-sm">Scanned Copy of Signature</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(currentStep === 2 && (!showUpdateFields || pendingUpdateFields.some(field =>
            ['businessName', 'businessType', 'registrationNumber', 'gstNumber',
            'salePointAddress', 'storageAddress', 'premisesOwnership', 'premisesSize',
            'responsiblePersonName', 'responsiblePersonDesignation', 'responsiblePersonQualification',
            'responsiblePersonContact', 'paymentMethod', 'paymentReference', 'paymentDate', 'paymentAmount'].includes(field)
          ))) && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <UpdateFieldWrapper fieldName="businessName">
                    <input
                      type="text"
                      name="businessName"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.businessName || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Business</label>
                  <UpdateFieldWrapper fieldName="businessType">
                    <select
                      name="businessType"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.businessType || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="proprietorship">Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="limited">Limited Company</option>
                      <option value="cooperative">Cooperative Society</option>
                    </select>
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                  <UpdateFieldWrapper fieldName="registrationNumber">
                    <input
                      type="text"
                      name="registrationNumber"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.registrationNumber || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                  <UpdateFieldWrapper fieldName="gstNumber">
                    <input
                      type="text"
                      name="gstNumber"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.gstNumber || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
              </div>

              <h4 className="font-semibold text-gray-700 mb-2">Business Premises Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Point Address</label>
                  <UpdateFieldWrapper fieldName="salePointAddress">
                    <textarea
                      name="salePointAddress"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.salePointAddress || ''}
                      onChange={handleChange}
                    ></textarea>
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Godown/Storage Address</label>
                  <UpdateFieldWrapper fieldName="storageAddress">
                    <textarea
                      name="storageAddress"
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.storageAddress || ''}
                      onChange={handleChange}
                    ></textarea>
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premises Ownership</label>
                  <UpdateFieldWrapper fieldName="premisesOwnership">
                    <select
                      name="premisesOwnership"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.premisesOwnership || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="owned">Owned</option>
                      <option value="rented">Rented</option>
                    </select>
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premises Size (in sq. ft.)</label>
                  <UpdateFieldWrapper fieldName="premisesSize">
                    <input
                      type="number"
                      name="premisesSize"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.premisesSize || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
              </div>

              <h4 className="font-semibold text-gray-700 mb-2">Responsible Person Details (Not below rank of Manager)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name of Responsible Person</label>
                  <UpdateFieldWrapper fieldName="responsiblePersonName">
                    <input
                      type="text"
                      name="responsiblePersonName"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.responsiblePersonName || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <UpdateFieldWrapper fieldName="responsiblePersonDesignation">
                    <input
                      type="text"
                      name="responsiblePersonDesignation"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.responsiblePersonDesignation || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <UpdateFieldWrapper fieldName="responsiblePersonQualification">
                    <input
                      type="text"
                      name="responsiblePersonQualification"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.responsiblePersonQualification || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <UpdateFieldWrapper fieldName="responsiblePersonContact">
                    <input
                      type="tel"
                      name="responsiblePersonContact"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.responsiblePersonContact || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
              </div>

              <h4 className="font-semibold text-gray-700 mb-2">Registration Fees Payment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <UpdateFieldWrapper fieldName="paymentMethod">
                    <select
                      name="paymentMethod"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.paymentMethod || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Method</option>
                      <option value="challan">Online Challan</option>
                      <option value="bankChallan">Bank Counter Challan</option>
                      <option value="demandDraft">Demand Draft</option>
                    </select>
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference/UTR Number</label>
                  <UpdateFieldWrapper fieldName="paymentReference">
                    <input
                      type="text"
                      name="paymentReference"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.paymentReference || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <UpdateFieldWrapper fieldName="paymentDate">
                    <input
                      type="date"
                      name="paymentDate"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.paymentDate || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid (Rs.)</label>
                  <UpdateFieldWrapper fieldName="paymentAmount">
                    <input
                      type="number"
                      name="paymentAmount"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.paymentAmount || ''}
                      onChange={handleChange}
                    />
                  </UpdateFieldWrapper>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents & Submission</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Required Documents</h4>
                <p className="text-sm text-gray-600 mb-3">Please upload the following documents:</p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="formA1Upload" className="mr-2" />
                    <label htmlFor="formA1Upload" className="text-sm">Duly filled Form A-1 (Signed Copy)</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="challanUpload" className="mr-2" />
                    <label htmlFor="challanUpload" className="text-sm">Payment Challan/Receipt</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="responsiblePersonUpload" className="mr-2" />
                    <label htmlFor="responsiblePersonUpload" className="text-sm">Responsible Person Acceptance (Rs.500/- stamp paper)</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="manufactureCertUpload" className="mr-2" />
                    <label htmlFor="manufactureCertUpload" className="text-sm">Certificate of Manufacture</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="labCertUpload" className="mr-2" />
                    <label htmlFor="labCertUpload" className="text-sm">Certificate of Laboratory Facility</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="bagPrintUpload" className="mr-2" />
                    <label htmlFor="bagPrintUpload" className="text-sm">Matter to be Printed on Bag/Container</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="premisesDocUpload" className="mr-2" />
                    <label htmlFor="premisesDocUpload" className="text-sm">Premises Ownership/Rental Documents</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="qualityAssuranceUpload" className="mr-2" />
                    <label htmlFor="qualityAssuranceUpload" className="text-sm">Quality Assurance Undertaking (Rs.500/- stamp paper)</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="inspectionReportUpload" className="mr-2" />
                    <label htmlFor="inspectionReportUpload" className="text-sm">Joint Inspection Report of DLC</label>
                    <button className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">Declaration</h4>
                <div className="p-4 bg-gray-50 rounded">
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm">
                      I/We declare that the information given above is true to the best of my/our knowledge and
                      belief and no part thereof is false or no material information has been concealed. I have read
                      the terms and conditions of eligibility for submission of Memorandum of intimation and
                      undertake that the same will be complied by me.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className={`px-4 py-2 rounded text-white ml-auto
                  ${isUpdate && pendingUpdateFields.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                onClick={handleSubmit}
                disabled={isUpdate && pendingUpdateFields.length > 0}
              >
                {isUpdate ? "Submit Updates" : "Submit Application"}
              </button>
            )}
          </div>

          {isUpdate && pendingUpdateFields.length > 0 && currentStep === 3 && (
            <div className="mt-4 text-yellow-600 text-sm">
              Please make all required updates before submitting the form.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <FormToolbar />
      {formType === 'fertilizerLicense' && renderFertilizerLicenseForm()}
      {/* Other form renderers would go here */}
      {formType !== 'fertilizerLicense' && (
        <div className="bg-yellow-50 p-6 rounded-lg shadow border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Form Under Development</h3>
          <p className="text-yellow-700">
            This form is currently being developed and will be available soon. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

// Submissions Component
const Submissions = () => {
  const [submissions, setSubmissions] = useState([
    { id: "FL-2024-0123", type: "Fertilizer Sale License", date: "15 May 2025", status: "Pending" },
    { id: "FA1-2024-0456", type: "Form A1 - Memorandum", date: "10 May 2025", status: "Under Review" },
    { id: "IR-2024-0789", type: "Inspection Report - Fertilizer", date: "05 May 2025", status: "Approved" },
    { id: "FV-2024-0321", type: "Form V - Inspector Forms", date: "28 Apr 2025", status: "Rejected" },
    { id: "FIV-2024-0654", type: "Form IV - Analyst Report", date: "20 Apr 2025", status: "Approved" }
  ]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [formTypeFilter, setFormTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [processingBatch, setProcessingBatch] = useState(false);
  const [showBatchAlert, setShowBatchAlert] = useState(false);

  const handleBatchProcess = () => {
    setProcessingBatch(true);
    // Simulate processing delay
    setTimeout(() => {
      const updatedSubmissions = submissions.map(submission => {
        if (submission.status === "Pending") {
          return { ...submission, status: "Under Review" };
        }
        return submission;
      });
      setSubmissions(updatedSubmissions);
      setProcessingBatch(false);
      setShowBatchAlert(true);
      // Hide alert after 5 seconds
      setTimeout(() => setShowBatchAlert(false), 5000);
    }, 2000);
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === "All" || submission.status === statusFilter;
    const matchesFormType = formTypeFilter === "All" || submission.type.includes(formTypeFilter);
    const matchesSearch = submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          submission.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesFormType && matchesSearch;
  });

  const pendingCount = submissions.filter(s => s.status === "Pending").length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Submissions</h2>
        <button
          onClick={handleBatchProcess}
          disabled={pendingCount === 0 || processingBatch}
          className={`px-4 py-2 rounded-lg text-white ${pendingCount === 0 || processingBatch ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {processingBatch ? (
            <>
              <span className="inline-block mr-2 animate-spin">⟳</span>
              Processing...
            </>
          ) : (
            `Process All Pending (${pendingCount})`
          )}
        </button>
      </div>

      {showBatchAlert && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">All pending submissions have been processed and moved to Review.</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search submissions..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <select
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formTypeFilter}
              onChange={(e) => setFormTypeFilter(e.target.value)}
            >
              <option value="All">All Form Types</option>
              <option value="Fertilizer">Fertilizer License</option>
              <option value="Form A1">Form A1</option>
              <option value="Inspection">Inspection Report</option>
              <option value="Form V">Form V</option>
              <option value="Form IV">Form IV</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map(submission => (
                <SubmissionRow
                  key={submission.id}
                  id={submission.id}
                  type={submission.type}
                  date={submission.date}
                  status={submission.status}
                />
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No submissions match your current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 flex items-center justify-between border-t">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredSubmissions.length}</span> results
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Submission Row Component
interface SubmissionRowProps {
  id: string;
  type: string;
  date: string;
  status: string;
}
const SubmissionRow: React.FC<SubmissionRowProps> = ({ id, type, date, status }) => {
  const statusColors: { [key: string]: string } = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Under Review': 'bg-blue-100 text-blue-800',
    'Approved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Pending Update': 'bg-purple-100 text-purple-800'
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <a href={`/forms/fertilizerLicense?edit=true&id=${id}`} className="text-blue-600 hover:text-blue-900 mr-3">View</a>
        {status === 'Rejected' || status === 'Pending Update' ? (
          <a href={`/forms/fertilizerLicense?edit=true&id=${id}`} className="text-blue-600 hover:text-blue-900 mr-3">Update</a>
        ) : null}
        <button className="text-blue-600 hover:text-blue-900">Track</button>
      </td>
    </tr>
  );
};

// Reports Component
const Reports = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Form Submissions by Type</h3>
          <div className="h-64 flex items-center justify-center border rounded">
            <p className="text-gray-500">Chart Visualization Would Appear Here</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Approval Statistics</h3>
          <div className="h-64 flex items-center justify-center border rounded">
            <p className="text-gray-500">Chart Visualization Would Appear Here</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Submission Trends</h3>
        <div className="h-80 flex items-center justify-center border rounded">
          <p className="text-gray-500">Chart Visualization Would Appear Here</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Generate Custom Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Form Submissions</option>
              <option>Approval Statistics</option>
              <option>Inspection Reports</option>
              <option>Sample Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Generate Report
        </button>
      </div>
    </div>
  );
};

// Settings Component
const SettingsPanel = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="+91 9876543210"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Password</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Change Password
        </button>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email updates about form status</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive text message updates about form status</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications on this device</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
              </div>
            </label>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default App;

    