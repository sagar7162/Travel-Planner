import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

function AddExpenseForm({ tripId, onClose, onExpenseAdded }) {
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [tripUsers, setTripUsers] = useState([]);
  const [splitAmong, setSplitAmong] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trip users to split expenses among
  useEffect(() => {
    const fetchTripUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/trip/${tripId}/users`);
        if (response.data && response.data.users) {
          setTripUsers(response.data.users);
          // Initialize splitAmong with all users and equal split
          const initialSplit = response.data.users.map(user => ({
            user: user._id,
            amount: 0, // Will be calculated when amount is entered
            name: user.name // For display purposes
          }));
          setSplitAmong(initialSplit);
        }
        setError(null);
      } catch (err) {
        setError("Error fetching trip users. Please try again.");
        console.error("Error fetching trip users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripUsers();
    }
  }, [tripId]);

  // Update split amounts when totalAmount changes
  useEffect(() => {
    if (totalAmount && splitAmong.length > 0) {
      const amount = parseFloat(totalAmount);
      const splitAmount = amount / splitAmong.length;
      const newSplit = splitAmong.map(item => ({
        ...item,
        amount: splitAmount.toFixed(2)
      }));
      setSplitAmong(newSplit);
    }
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!description || !totalAmount) {
      alert("Please fill in all required fields");
      return;
    }

    const expenseData = {
      description,
      totalAmount: parseFloat(totalAmount),
      splitAmong: splitAmong.map(item => ({
        user: item.user,
        amount: parseFloat(item.amount)
      }))
    };

    try {
      setLoading(true);
      const response = await axios.post(`/trip/${tripId}/expense`, expenseData);
      if (response.data && response.data.success) {
        alert("Expense added successfully!");
        if (onExpenseAdded) {
          onExpenseAdded();
        }
        onClose();
      }
    } catch (err) {
      setError("Error adding expense. Please try again.");
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSplitChange = (userId, amount) => {
    const newSplit = splitAmong.map(item => 
      item.user === userId ? { ...item, amount } : item
    );
    setSplitAmong(newSplit);
  };

  if (loading && tripUsers.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <p className="text-xl">Loading trip users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Expense</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expense description"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Total Amount (Paid By You)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Split Among</h3>
            {splitAmong.map((item) => (
              <div key={item.user} className="flex items-center mb-2">
                <span className="w-1/3">{item.name}</span>
                <div className="flex items-center w-1/3 relative">
                  <span className="absolute left-3 text-gray-500">$</span>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => handleSplitChange(item.user, e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseForm;
