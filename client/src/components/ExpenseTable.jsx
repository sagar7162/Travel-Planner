import React, { useState, useEffect } from "react";
import axios from "../utils/axios";

// Helper function to safely format dates
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    return "Unknown date";
  }
};

// Helper function to safely format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

function ExpenseTable({ tripId, onClose }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a function to fetch expenses that can be called from outside useEffect
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/trip/${tripId}/expenses`);
      setExpenses(response.data.expenses || []);
      setError(null);
      console.log("Expenses refreshed:", response.data.expenses);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching expenses");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchExpenses();
    }
  }, [tripId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <p className="text-xl">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Expense Break-Up</h2>
          <div className="flex space-x-2">
            <button
              onClick={fetchExpenses}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
        
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found for this trip.</p>
        ) : (
          <div>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Description</th>
                  <th className="border border-gray-300 px-4 py-2">Paid By</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Split Details</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {expense.paidBy?.name || 'Unknown user'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatCurrency(expense.totalAmount)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDate(expense.date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc pl-4">
                        {expense.splitAmong && expense.splitAmong.map((split) => (
                          <li key={split.user?._id || Math.random()}>
                            {split.user?.name || 'Unknown user'}: {formatCurrency(split.amount)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-200 font-bold">
                  <td className="border border-gray-300 px-4 py-2" colSpan="2">
                    Total Expenses
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatCurrency(expenses.reduce((sum, expense) => sum + expense.totalAmount, 0))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2" colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Summary</h3>
              <p className="text-sm text-gray-600">
                This trip has a total of {expenses.length} expenses with a combined value of {formatCurrency(expenses.reduce((sum, expense) => sum + expense.totalAmount, 0))}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseTable;