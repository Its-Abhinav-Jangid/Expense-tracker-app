function TransactionsListSkeleton({ length }) {
  return [1, 2, 3, 4, 5, 6].map((_d, i) => (
    <div key={i} className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl">
            <div className="animate-pulse h-6 bg-gray-700 rounded-sm w-6 " />
          </div>
          <div>
            <div className="animate-pulse h-4 bg-gray-700 rounded-full w-16" />

            <div className="flex items-center text-sm text-gray-400 mt-1">
              <div className="animate-pulse h-4 bg-gray-700 rounded-full w-12" />
            </div>
          </div>
        </div>

        <span className="text-lg font-medium text-red-300">
          <div className="animate-pulse h-4 bg-gray-700 rounded-full w-16" />
        </span>
      </div>
    </div>
  ));
}

export default TransactionsListSkeleton;
