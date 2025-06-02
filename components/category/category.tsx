"use client";

import React, { use, useEffect, useState } from "react";
import { Edit2, X, Check, Plus } from "lucide-react";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "@/hooks/useCategory";
import { Button } from "../ui/button";

interface Category {
  id: number;
  name: string;
  created_at: string;
}

interface CategoryTableProps {
  initialCategories?: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  initialCategories = [
    {
      id: 1,
      name: "Chair",
      created_at: "2025-05-10T21:40:46.000000Z",
    },
    {
      id: 2,
      name: "Table",
      created_at: "2025-05-10T22:15:30.000000Z",
    },
    {
      id: 3,
      name: "Lamp",
      created_at: "2025-05-11T09:22:15.000000Z",
    },
  ],
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const { data: catData } = useGetCategory();
  const { mutate: categoryMute } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const categoryData = catData?.data?.data?.list || [];
  const [categories, setCategories] = useState<Category[]>(categoryData);
  const mutation = useUpdateCategory();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const startEdit = (category: Category): void => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditName("");
  };

  useEffect(() => {
    if (categoryData.length > 0) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const saveEdit = (): void => {
    console.log("Saving edit for ID:", editingId, "with name:", editName);
    if (editName.trim() && editingId) {
      mutation.mutate({
        id: editingId.toString(),
        categoryData: { name: editName.trim() },
      });
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, name: editName.trim() } : cat
        )
      );

      setEditingId(null);
      setEditName("");
    }
  };

  const addNewCategory = (): void => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        name: newCategoryName.trim(),
        created_at: new Date().toISOString(),
      };
      categoryMute(newCategory);
      console.log("Adding new category:", newCategory);
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setIsAddingNew(false);
    }
  };

  const cancelAdd = (): void => {
    setIsAddingNew(false);
    setNewCategoryName("");
  };

  return (
    <div className="w-full max-w-6xl  pt-8 pl-8">
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center px-6 py-4 w-full ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
            <div className="flex items-center justify-center md:justify-start md:items-start flex-col ">
              <h2 className="text-xl font-semibold text-gray-900">
                Categories
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your product categories
              </p>
            </div>

            <Button
              onClick={() => setIsAddingNew(true)}
              type="button"
              className="bg-[#B88E2F] w-[300px] sm:w-auto p-4 text-white hover:text-[#B88E2F] hover:bg-white hover:border hover:border-[#B88E2F] transition-colors duration-300"
              variant="outline"
            >
              <Plus />
              Add Product
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-scroll w-[380px] lg:w-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b ">ID</th>
                <th className="py-2 px-4 border-b ">Name</th>
                <th className="py-2 px-4 border-b ">Created At</th>
                <th className="py-2 px-4 border-b ">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Add New Category Row */}
              {isAddingNew && (
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    —
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addNewCategory();
                        if (e.key === "Escape") cancelAdd();
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    —
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={addNewCategory}
                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelAdd}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {/* Category Rows */}
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    ) : (
                      <div className="py-2 px-4  text-center">
                        {category.name}
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="hidden sm:block">
                      {formatDate(category.created_at)}
                    </div>
                    <div className="sm:hidden">
                      {new Date(category.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {editingId === category.id ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition-colors"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center justify-center ">
                        <button
                          onClick={() => startEdit(category)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteCategory(category.id);
                            setCategories(
                              categories.filter((cat) => cat.id !== category.id)
                            );
                          }}
                          className="text-blue-600 hover:text-red-500 p-1 rounded-full hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && !isAddingNew && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first category.
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total: {categories.length} categories</span>
            <span className="hidden sm:block">
              Click the edit icon to modify category names
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
