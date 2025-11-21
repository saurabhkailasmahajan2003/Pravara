import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

// Sample initial data
const initialEmployees = [
  {
    empId: 'E1001',
    name: 'Alice Smith',
    monthlySalary: 80000,
    mobileRecharge: 500,
    travelAllowance: 1500,
    otherExpenses: 300,
  },
  {
    empId: 'E1002',
    name: 'Bob Johnson',
    monthlySalary: 72000,
    mobileRecharge: 400,
    travelAllowance: 1200,
    otherExpenses: 150,
  },
  {
    empId: 'E1003',
    name: 'Charlie Brown',
    monthlySalary: 95000,
    mobileRecharge: 600,
    travelAllowance: 2000,
    otherExpenses: 500,
  },
];

// Define the shape of an empty form
const emptyFormState = {
  empId: '',
  name: '',
  monthlySalary: '',
  mobileRecharge: '',
  travelAllowance: '',
  otherExpenses: '',
};

function Salary() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState(emptyFormState);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // --- Modal and Form Handlers ---

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData(emptyFormState);
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setModalMode('edit');
    setFormData(employee);
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
    setFormData(emptyFormState);
  };

  const handleChange = (e) => {
    // FIXED: Removed the extra '_' that was here
    const { name, value } = e.target;
    
    // Handle number inputs
    const isNumericField = ['monthlySalary', 'mobileRecharge', 'travelAllowance', 'otherExpenses'].includes(name);
    setFormData({
      ...formData,
      [name]: isNumericField ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      // Add new employee logic
      setEmployees([...employees, { ...formData, empId: formData.empId || `E${Date.now()}` }]);
    } else {
      // Edit existing employee logic
      setEmployees(
        employees.map((emp) =>
          emp.empId === employeeToEdit.empId ? formData : emp
        )
      );
    }
    handleCloseModal();
  };

  // --- CRUD Operations ---

  const handleDelete = (empId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((employee) => employee.empId !== empId));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Employee Management
          </h1>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150"
          >
            <Plus size={20} className="mr-2" />
            Add Employee
          </button>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Recharge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Allowance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Expenses</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.empId} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.empId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(employee.monthlySalary)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(employee.mobileRecharge)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(employee.travelAllowance)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(employee.otherExpenses)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditModal(employee)}
                        className="text-indigo-600 hover:text-indigo-900 transition duration-150 mr-4"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.empId)}
                        className="text-red-600 hover:text-red-900 transition duration-150"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                {modalMode === 'add' ? 'Add New Employee' : 'Edit Employee'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Employee ID */}
                <div>
                  <label htmlFor="empId" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="empId"
                    id="empId"
                    value={formData.empId}
                    onChange={handleChange}
                    readOnly={modalMode === 'edit'}
                    placeholder={modalMode === 'add' ? 'Auto-generated if blank' : ''}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${modalMode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                </div>

                {/* Employee Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Monthly Salary */}
                <div>
                  <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Salary
                  </label>
                  <input
                    type="number"
                    name="monthlySalary"
                    id="monthlySalary"
                    value={formData.monthlySalary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Mobile Recharge */}
                <div>
                  <label htmlFor="mobileRecharge" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Recharge
                  </label>
                  <input
                    type="number"
                    name="mobileRecharge"
                    id="mobileRecharge"
                    value={formData.mobileRecharge}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Travel Allowance */}
                <div>
                  <label htmlFor="travelAllowance" className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Allowance
                  </label>
                  <input
                    type="number"
                    name="travelAllowance"
                    id="travelAllowance"
                    value={formData.travelAllowance}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Other Expenses */}
                <div>
                  <label htmlFor="otherExpenses" className="block text-sm font-medium text-gray-700 mb-1">
                    Other Expenses
                  </label>
                  <input
                    type="number"
                    name="otherExpenses"
                    id="otherExpenses"
                    value={formData.otherExpenses}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end pt-4 space-x-3 border-t mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                >
                  {modalMode === 'add' ? 'Save Employee' : 'Update Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Salary;