import ExpoModulesCore

public class CoodinateTrackerModule: Module {
  let coordinateTracker = CoordinateTracker()
  public func definition() -> ModuleDefinition {
    Name("CoodinateTracker")

    AsyncFunction("initializeAI") {
      coordinateTracker.initializeAI()
    }
    
    AsyncFunction("getCoordinates") { (videoURL: String) in
      return await coordinateTracker.getCoordinates(videoURL: videoURL)
    }
  }
}
