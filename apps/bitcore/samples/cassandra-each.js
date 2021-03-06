var cassandra = require('cassandra-driver')
var client = new cassandra.Client({contactPoints: process.env.CASSANDRA_HOSTS.split(","), keyspace: 'sparkoin'})
var rowCount = 0
var BitSet = require("bit-set")
var blockSet = new BitSet()
var maxId = -1
var currentHeight = -1

function loadTransactions() {
  console.log("finito")
}

var fetchSize=4096

function findMissingBlocks() {
  var rowCount = 0;
  var maxId = -1;
  client.eachRow('SELECT id FROM blockchain', [],
    {fetchSize: fetchSize, autoPage: true, prepare: true, readTimeout: 0},
    function (n, row) {
       ++rowCount;
       blockSet.set(row.id)
       maxId = Math.max(maxId, row.id)
       if( (rowCount % 10000) == 0) {
            console.log("read count="+rowCount+ " maxId="+maxId)
       }
    },
    function (err, result) {
      if(err) {
       console.log(err)
       console.log(rowCount)
       blockSet = new BitSet()
       fetchSize= Math.floor(fetchSize / 2)
       if(fetchSize < 1) fetchSize = 1
       console.log("retring with fetchSize="+fetchSize)
       setTimeout(findMissingBlocks, 1000)
     } else {
       console.log("final read count="+rowCount+ " maxId="+maxId)
       for(i=0; i<=rowCount; i++) {
         if(!blockSet.get(i)) {
           console.log("missing "+i)
         }
       }
       currentHeight = Math.max(currentHeight, maxId)
       started = 1
       loadTransactions()
     }
    })
}

findMissingBlocks()


/*

client.stream('SELECT id FROM blockchain')
      .on('error', function (err) {
          error(err)
          setTimeout(loadTransactions, 1000)
      })
      .on('readable', function () {
          var row;
          while (row = this.read()) {
               ++rowCount
               blockSet.set(row.id)
               if( (rowCount % 10000) == 0) {
                 debug("read count="+rowCount+" blockset cardinality="+blockSet.cardinality())
                }
              row = null
          }
      })
      .on('end', function () {
          info("***** started at current height="+currentHeight+" found #"+blockSet.cardinality())
          started = true
          currentBlock = 0
          loadTransactions()
      })



*/
