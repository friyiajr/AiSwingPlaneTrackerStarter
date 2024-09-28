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
  
  func getCoordinates(videoURL: String) async -> [[String: Any?]] {
    var allValues: [[String: Any?]] = [[:]]
    
    let assetURL = URL(string: videoURL)!
    let asset = AVAsset(url: assetURL)
    let assetTrack = try! await asset.loadTracks(withMediaType: .video).first!
    let assetReader = try! AVAssetReader(asset: asset)
    
    let outputSettings: [String: Any] = await [
      String(kCVPixelBufferPixelFormatTypeKey): kCVPixelFormatType_32BGRA,
      String(kCVPixelBufferWidthKey): UIScreen.main.bounds.size.height,
      String(kCVPixelBufferHeightKey): UIScreen.main.bounds.size.width
    ]
    
    let assetReaderTrack = AVAssetReaderTrackOutput(track: assetTrack, outputSettings: outputSettings)
    
    assetReader.add(assetReaderTrack)
    assetReader.startReading()
    
    while let sampleBuffer = assetReaderTrack.copyNextSampleBuffer() {
      
      guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
        continue
      }
      
      let image = UIImage(pixelBuffer: pixelBuffer)?.rotate(radians: .pi / 2)
      
      model?.detect(image: image!) { predictions, error in
        if error != nil {
          print(error)
        } else {
          guard let predictions else {
            return
          }
          
          for prediction in predictions {
            let frameTime = String(format: "% 4.2f", CMSampleBufferGetPresentationTimeStamp(sampleBuffer).seconds)
            
            print("SCANNING \(frameTime)")
            var values = prediction.getValues()
            values["frameTime"] = frameTime
            allValues.append(values)
          }
        }
      }
    }
    return allValues
  }
}


extension UIImage {
    func rotate(radians: Float) -> UIImage? {
        var newSize = CGRect(origin: CGPoint.zero, size: self.size).applying(CGAffineTransform(rotationAngle: CGFloat(radians))).size
        // Trim off the extremely small float value to prevent core graphics from rounding it up
        newSize.width = floor(newSize.width)
        newSize.height = floor(newSize.height)
        
        UIGraphicsBeginImageContextWithOptions(newSize, false, self.scale)
        guard let context = UIGraphicsGetCurrentContext() else { return nil }
        
        // Move origin to middle
        context.translateBy(x: newSize.width/2, y: newSize.height/2)
        // Rotate around middle
        context.rotate(by: CGFloat(radians))
        // Draw the image at its center
        self.draw(in: CGRect(x: -self.size.width/2, y: -self.size.height/2, width: self.size.width, height: self.size.height))
    
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return newImage
    }
}
