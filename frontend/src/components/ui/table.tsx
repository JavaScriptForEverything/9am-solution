export const Table = () => {
  // Sample data for the table
  const tableData = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', address: '123 Main St', city: 'New York', country: 'USA', phone: '555-1234', status: 'Active', lastLogin: '2023-05-15' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', address: '456 Oak Ave', city: 'Los Angeles', country: 'USA', phone: '555-5678', status: 'Inactive', lastLogin: '2023-04-20' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', address: '789 Pine Rd', city: 'Chicago', country: 'USA', phone: '555-9012', status: 'Active', lastLogin: '2023-05-10' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Scrollable Table Example</h1>
      
      {/* Container div with fixed width and horizontal scrolling */}
      <div className="w-full border border-gray-300 rounded-lg overflow-x-auto">
        {/* Table with min-width to force scrolling when needed */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


