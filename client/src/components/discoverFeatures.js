import React from 'react'

export const DiscoverFeatures = () => {

  return (
    <section id="discoverfeatures">
      <div className="box">
        <div className="text">
          <p>This application is convenient for recording tasks. You can add tasks, delete, mark as done.</p>
        </div>
        <img src="https://i.ibb.co/PZ6nRnw/tasks.png" alt="tasks"/>
      </div>

      <div className="box">
        <img src="https://i.ibb.co/vV3GzgL/desks.png" alt="desks"/>
        <div className="text">
          <p>Here you can simply add new desk with another tasks for you own purposes.</p>
        </div>
      </div>

      <div className="box">
        <div className="text">
          <p>We encrypt your tasks with SimpleCrypto and hash your password with bcrypt.</p>
        </div>
        <img src="https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/different-types-of-encryption-hero1563466041427238.jpg" alt="encryption"/>
      </div>






    </section>
  );



}