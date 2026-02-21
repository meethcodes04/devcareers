import ResourceCard from './ResourceCard';

function ResourcesGrid({ resources }) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-amber-50 rounded-lg">
        <svg className="w-16 h-16 mx-auto mb-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium mb-2">No resources found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 lg:hidden">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} isMobile={true} />
        ))}
      </div>
      <div className="hidden lg:grid lg:grid-cols-5 gap-6 ml-8 mr-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} isMobile={false} />
        ))}
      </div>
    </>
  );
}

export default ResourcesGrid;
