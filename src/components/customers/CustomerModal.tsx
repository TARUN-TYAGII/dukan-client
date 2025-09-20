'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { CustomerDTO, CustomerType } from '@/types';

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().optional(),
  customerType: z.nativeEnum(CustomerType).optional(),
  institutionName: z.string().optional(),
  contactPerson: z.string().optional(),
  gstNumber: z.string().optional(),
  isActive: z.boolean().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: CustomerDTO | null;
  mode: 'create' | 'edit' | 'view';
}

export default function CustomerModal({ isOpen, onClose, customer, mode }: CustomerModalProps) {
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerType: CustomerType.INDIVIDUAL,
      isActive: true,
    },
  });

  const customerType = watch('customerType');

  useEffect(() => {
    if (customer) {
      setValue('name', customer.name);
      setValue('email', customer.email);
      setValue('phone', customer.phone);
      setValue('address', customer.address || '');
      setValue('city', customer.city || '');
      setValue('state', customer.state || '');
      setValue('pincode', customer.pincode || '');
      setValue('country', customer.country || '');
      setValue('customerType', customer.customerType || CustomerType.INDIVIDUAL);
      setValue('institutionName', customer.institutionName || '');
      setValue('contactPerson', customer.contactPerson || '');
      setValue('gstNumber', customer.gstNumber || '');
      setValue('isActive', customer.isActive ?? true);
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        customerType: CustomerType.INDIVIDUAL,
        institutionName: '',
        contactPerson: '',
        gstNumber: '',
        isActive: true,
      });
    }
  }, [customer, setValue, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (mode === 'create') {
        await createCustomerMutation.mutateAsync(data);
      } else if (mode === 'edit' && customer?.id) {
        await updateCustomerMutation.mutateAsync({ id: customer.id, customer: data });
      }
      onClose();
      reset();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Add New Customer' : mode === 'edit' ? 'Edit Customer' : 'View Customer';
  const showInstitutionFields = customerType === CustomerType.SCHOOL || customerType === CustomerType.INSTITUTION;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                {...register('name')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Type
              </label>
              <select
                {...register('customerType')}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                {Object.values(CustomerType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                {...register('phone')}
                type="tel"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {showInstitutionFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution Name
                </label>
                <input
                  {...register('institutionName')}
                  type="text"
                  readOnly={isReadOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  {...register('contactPerson')}
                  type="text"
                  readOnly={isReadOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              {...register('address')}
              rows={2}
              readOnly={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register('city')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                {...register('state')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                {...register('pincode')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                {...register('country')}
                type="text"
                readOnly={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {showInstitutionFields && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  {...register('gstNumber')}
                  type="text"
                  readOnly={isReadOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            )}
          </div>

          {!isReadOnly && (
            <div className="flex items-center">
              <input
                {...register('isActive')}
                type="checkbox"
                id="isActive"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active Customer
              </label>
            </div>
          )}

          {!isReadOnly && (
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createCustomerMutation.isPending || updateCustomerMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {mode === 'create' ? 'Create Customer' : 'Update Customer'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
