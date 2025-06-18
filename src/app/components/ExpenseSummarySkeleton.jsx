function ExpenseSummarySkeleton(props) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <div className="text-2xl font-bold">
            <div className="mt-2 animate-pulse h-6 bg-gray-700 rounded-full w-16" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Largest Expense</p>
          <div className="text-2xl font-bold text-red-300">
            <div className="mt-2 animate-pulse h-6 bg-gray-700 rounded-full w-16" />
          </div>
        </div>
      </div>
      {props.children} {/* for expense list item (if applicable)*/}
    </div>
  );
}

export default ExpenseSummarySkeleton;
