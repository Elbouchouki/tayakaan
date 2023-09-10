"use client"
import React, { useState } from "react";

interface GRCFormData {
  companyName: string;
  governancePractices: string;
  riskManagement: string;
  complianceStatus: string;
}

function GRCQuestionnaire(): JSX.Element {
  const [formData, setFormData] = useState<GRCFormData>({
    companyName: "",
    governancePractices: "",
    riskManagement: "",
    complianceStatus: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // You can process the form data here, e.g., send it to an API or display it.
    console.log(formData);
  };

  return (
    <div className="max-w-lg  p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Name:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Governance Practices:
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            name="governancePractices"
            value={formData.governancePractices}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Risk Management:
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            name="riskManagement"
            value={formData.riskManagement}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Compliance Status:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            name="complianceStatus"
            value={formData.complianceStatus}
            onChange={handleChange}
          >
            <option value="not-compliant">Not Compliant</option>
            <option value="partially-compliant">Partially Compliant</option>
            <option value="fully-compliant">Fully Compliant</option>
          </select>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default GRCQuestionnaire;
