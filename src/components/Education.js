import React from 'react';

const Education = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4 text-blue-700">What is ROSCA?</h2>
      <p className="text-gray-700 mb-4">
        A Rotating Savings and Credit Association (ROSCA) is a group of individuals who agree to meet for a defined period to save and borrow together, forming a kind of peer-to-peer banking system. Each member contributes an agreed amount of money to a common fund, which is then distributed to one member on a rotating basis.
      </p>
      <h3 className="text-2xl font-semibold mb-3 text-green-600">How Does ROSCA Work?</h3>
      <p className="text-gray-700 mb-4">
        In a ROSCA, all participants contribute a fixed sum of money to a communal pot at regular intervals. The total amount collected is then given to one member of the group each time, and this cycle continues until every member has received the pooled funds at least once.
      </p>
      <h3 className="text-2xl font-semibold mb-3 text-green-600">Benefits of ROSCA:</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li><strong>Savings Discipline</strong>: Participating in a ROSCA encourages members to save regularly.</li>
        <li><strong>Access to Lump Sum</strong>: Members can access a large sum of money for urgent needs without requiring traditional loans.</li>
        <li><strong>Community Support</strong>: ROSCAs are based on trust and community, fostering stronger social bonds among participants.</li>
        <li><strong>Financial Inclusion</strong>: ROSCAs can provide financial services to individuals who may not have access to traditional banking.</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-3 text-green-600">Why Join a ROSCA?</h3>
      <p className="text-gray-700">
        By joining a ROSCA, you not only benefit from disciplined saving and access to credit, but you also become part of a supportive community that helps one another meet financial goals.
      </p>
    </div>
  );
};

export default Education;
