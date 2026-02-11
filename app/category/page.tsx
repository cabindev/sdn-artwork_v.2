"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const ListCategory = () => {

  const [category, setCategory] = useState([])

  const fetchCategory = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategory(res.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }
  useEffect(() => {
    fetchCategory()


  },[])

  const deletePost = async (id: Number) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      fetchCategory()
    } catch (error) {
      console.error('Failed to delete the post', error)
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-semibold mb-6">Category</h1>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {category.map((category: any) => (
                <tr key={category.id}>
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      href={`/category/edit/${category.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/category/create"
      >
        Create a New Category
      </Link>
    </div>
  );
}
export default ListCategory