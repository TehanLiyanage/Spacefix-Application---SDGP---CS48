interface SpaceCardProps {
  id: string;
  capacity: number;
  occupancy: number;
}

export function SpaceCard({ id, capacity, occupancy }: SpaceCardProps) {
  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const ratio = capacity ? occupancy / capacity : 0;
    if (ratio > 0.7) return 'border-green-500';
    if (ratio < 0.3) return 'border-red-500';
    return 'border-orange-500';
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="text-4xl font-bold text-center text-[#002736] mb-8">
        {id}
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="text-[#002736] font-medium mb-2">Space Capacity</div>
          <div className="text-right text-xl font-bold text-[#002736]">
            {capacity}
          </div>
        </div>
        
        <div>
          <div className="text-[#002736] font-medium mb-2">Occupancy Level</div>
          <div className={`text-center text-2xl font-bold border-2 rounded-full py-2 ${getOccupancyColor(occupancy, capacity)}`}>
            {occupancy}
          </div>
        </div>
        
        <button className="w-full bg-[#ff4d4d] text-white py-3 rounded-full hover:bg-opacity-90 transition-colors">
          Deallocate
        </button>
      </div>
    </div>
  );
}
