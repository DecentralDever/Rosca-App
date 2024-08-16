import React, { useState } from 'react';

const MembersList = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleMemberDetails = (member) => {
    setSelectedMember(selectedMember === member ? null : member);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Members List</h2>
      <ul className="divide-y divide-gray-200">
        {members.map((member, index) => (
          <li key={index} className="py-4 text-gray-700">
            <div
              className="cursor-pointer"
              onClick={() => toggleMemberDetails(member)}
            >
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Total Contributions:</strong> {member.totalContributions} ETH</p>
            </div>
            {selectedMember === member && (
              <div className="mt-2 pl-4">
                <p><strong>Contribution History:</strong></p>
                <ul className="list-disc pl-6">
                  {member.contributionHistory.map((contribution, i) => (
                    <li key={i}>{contribution.amount} ETH on {contribution.date}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
