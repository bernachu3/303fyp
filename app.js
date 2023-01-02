(function () {

  const request = indexedDB.open('CRM', 1);

  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  request.onsuccess = (event) => {
      // TODO add stuff here
  };

   // create the object store and indexes
 request.onupgradeneeded = (event) => {
     let db = event.target.result;

     let store = db.createObjectStore('prices', {
         autoIncrement: true
     });

     // sets product barcode as primary key
     let index = store.createIndex('barcode', 'barcode', {
         unique: true
     });
 };

 function insert(db, price) {
    // create a new transaction
    const txn = db.transaction('prices', 'readwrite');

    // get the object store
    const store = txn.objectStore('prices');
    //
    let query = store.put(price);

    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };

    // error show
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    // close the database
    txn.oncomplete = function () {
        db.close();
    };
  }

  request.onsuccess = (event) => {
     const db = event.target.result;

     insert(db, {
         barcode: '97800000001',
         name: 'Apple'
     });

     insert(db, {
         barcode: '97800000002',
         name: 'Orange'
     });
};

})();
