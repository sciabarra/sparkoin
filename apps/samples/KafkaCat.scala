package samples

import org.apache.log4j.{Level, Logger}
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.streaming._

/**
  * Created by msciab on 25/03/16.
  */
object KafkaCat extends App {

  Logger.getLogger("org").setLevel(Level.OFF)
  Logger.getLogger("akka").setLevel(Level.OFF)


  val conf = new SparkConf().setAppName("Test").setMaster("local")
  val sc = new SparkContext(conf)
  val ssc = new StreamingContext(sc, Seconds(1))

  val kafkaParams = Map[String, String]("metadata.broker.list" -> s"${sys.props("ip.loc")}:9092")

  val topicsSet = "tx".split(",").toSet

  val messages = KafkaUtils.createDirectStream[String, String, StringDecoder, StringDecoder](
    ssc, kafkaParams, topicsSet)

  messages.print()

  ssc.start()
  ssc.awaitTermination()
}
