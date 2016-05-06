scalaVersion := "2.10.5"

autoScalaLibrary := false

libraryDependencies ++= Seq(
  "org.scala-lang" % "scala-library" % "2.10.5" % "provided"
  , ("org.json4s" %% "json4s-jackson" % "3.2.10")
    .exclude("org.scala-lang", "scala-library")
    //.exclude("org.scala-lang", "scala-compiler")
    //.exclude("org.scala-lang", "scala-reflect")
    .exclude("org.scala-lang", "scalap")
)

assemblyOutputPath in assembly := baseDirectory.value.getParentFile / "jupyter" / "sparkoin.jar"
