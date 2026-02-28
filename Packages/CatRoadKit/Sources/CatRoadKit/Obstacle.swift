//
//  Obstacle.swift
//  CatRoadKit
//
//  Created by HAEDONG KIM on 11/22/25.
//
import SwiftUI

public struct Obstacle: Identifiable {
    public let id = UUID()
    public var position: CGPoint
    public var size: CGSize
    public var pixels: [Pixel]

    public init(position: CGPoint, size: CGSize, pixels: [Pixel]) {
        self.position = position
        self.size = size
        self.pixels = pixels
    }

    public func frame() -> CGRect { CGRect(origin: position, size: size) }
    public func intersects(with cat: Cat) -> Bool { frame().intersects(cat.frame()) }
}
