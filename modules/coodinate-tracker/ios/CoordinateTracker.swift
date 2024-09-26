//
//  CoordinateTracker.swift
//  CoodinateTracker
//
//  Created by Daniel Friyia on 2024-09-26.
//

import AVKit
import PhotosUI
import SwiftUI
import CoreML
import Roboflow
import VideoToolbox


class CoordinateTracker {
  
  let rf = RoboflowMobile(apiKey: API_KEY)
  var model: RFObjectDetectionModel?
  
  func initializeAI() {
    if model != nil {
      return
    }
    
    rf.load(model: "pose-ybq0t", modelVersion: 2) { [weak self] myModel, error, modelName, modelType in
      
      guard let self else { return }
      
      if error != nil {
        print(error?.localizedDescription ?? "ERROR")
      } else {
        model?.configure(threshold: 0.8, overlap: 0.1, maxObjects: 1)
        model = myModel
        print("MODEL LOADED")
      }
    }
  }
}
