'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCustomers, useDeleteCustomer } from '@/hooks/useCustomers';
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';
import CustomerModal from '@/components/customers/CustomerModal';
import { CustomerDTO } from '@/types';

export default function AdminCustomersPage() {
  const { data: customers, isLoading } = useCustomers();
  const deleteCustomerMutation = useDeleteCustomer();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDTO | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const filteredCustomers = customers?.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  ) || [];

  const handleCreateCustomer = () => {
    setSelectedCustomer(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: CustomerDTO) => {
    setSelectedCustomer(customer);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewCustomer = (customer: CustomerDTO) => {
    setSelectedCustomer(customer);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomerMutation.mutateAsync(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers Management</h1>
            <p className="text-gray-600 mt-2">Manage your customer database</p>
          </div>
          <button
            onClick={handleCreateCustomer}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No customers found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                              customer.customerType === 'INDIVIDUAL' 
                                ? 'bg-blue-100 text-blue-800'
                                : customer.customerType === 'SCHOOL'
                                ? 'bg-green-100 text-green-800'
                                : customer.customerType === 'INSTITUTION'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {customer.customerType?.replace('_', ' ')}
                            </span>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            customer.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{customer.phone}</span>
                          </div>
                          {customer.city && (
                            <div className="text-sm text-gray-600">
                              <span>{customer.city}{customer.state && `, ${customer.state}`}</span>
                            </div>
                          )}
                          {customer.institutionName && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Institution:</span> {customer.institutionName}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <button
                            onClick={() => handleViewCustomer(customer)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditCustomer(customer)}
                            className="text-green-600 hover:text-green-700 p-1"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id!)}
                            className="text-red-600 hover:text-red-700 p-1"
                            title="Delete"
                            disabled={deleteCustomerMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        mode={modalMode}
      />
    </Layout>
  );
}
