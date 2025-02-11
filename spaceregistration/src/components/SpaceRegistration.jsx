import React, { useState } from 'react';
import { 
  Building,
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
} from 'lucide-react';

const SpaceRegistration = () => {
  const [spaces, setSpaces] = useState([
    {
      id: '1',
      name: 'Lab 101',
      type: 'Laboratory',
      building: 'Engineering Block',
      floor: '1',
      capacity: 30,
      facilities: ['Computers', 'Projector', 'Whiteboard'],
      status: 'Available'
    },
    {
      id: '1',
      name: 'Lab 101',
      type: 'Laboratory',
      building: 'Engineering Block',
      floor: '1',
      capacity: 30,
      facilities: ['Computers', 'Projector', 'Whiteboard'],
      status: 'Available'
    },
    {
      id: '1',
      name: 'Lab 101',
      type: 'Laboratory',
      building: 'Engineering Block',
      floor: '1',
      capacity: 30,
      facilities: ['Computers', 'Projector', 'Whiteboard'],
      status: 'Available'
    }

  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const spaceTypes = ['Classroom', 'Laboratory', 'Study Area', 'Meeting Room', 'Lecture Hall'];
  const [newSpace, setNewSpace] = useState({
    name: '',
    type: '',
    building: '',
    floor: '',
    capacity: '',
    facilities: '',
    status: 'Available'
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSpace((prev) => ({ ...prev, [name]: value }));
  };

  // Function to add new space
  const handleAddSpace = () => {
    if (!newSpace.name || !newSpace.type || !newSpace.building || !newSpace.capacity) {
      alert("Please fill in all required fields.");
      return;
    }

    setSpaces([...spaces, { ...newSpace, id: Date.now().toString(), facilities: newSpace.facilities.split(', ') }]);
    setShowAddForm(false);
    setNewSpace({
      name: '',
      type: '',
      building: '',
      floor: '',
      capacity: '',
      facilities: '',
      status: 'Available'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold">Space Management</h1>
          <p className="mt-2 text-blue-100">Register and manage all university spaces in one place</p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow">
          {/*search bar */}
          <div className="relative flex-1">
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input
               type="text"
               placeholder="Search spaces..."
               className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              {spaceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        

          {/* Add New Space Button */}
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={20} />
            Add New Space
          </button>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map(space => (
            <div key={space.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
                  <p className="text-gray-600">{space.type}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150">
                    <Edit2 size={16} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-full transition duration-150">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Building size={16} className="text-blue-500" />
                  <span>{space.building} - Floor {space.floor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Capacity:</span> 
                  <span className="text-gray-600">{space.capacity} people</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Facilities:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {space.facilities.map(facility => (
                      <span key={facility} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    space.status === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {space.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Adding New Space */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Space</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Space Name" className="border p-2 rounded" onChange={handleChange} />
                <select name="type" className="border p-2 rounded" onChange={handleChange}>
                  <option value="">Select Type</option>
                  {spaceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <input type="text" name="building" placeholder="Building" className="border p-2 rounded" onChange={handleChange} />
                <input type="text" name="floor" placeholder="Floor" className="border p-2 rounded" onChange={handleChange} />
                <input type="number" name="capacity" placeholder="Capacity" className="border p-2 rounded" onChange={handleChange} />
                <input type="text" name="facilities" placeholder="Facilities (comma separated)" className="border p-2 rounded" onChange={handleChange} />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleAddSpace}>Save Space</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceRegistration;
