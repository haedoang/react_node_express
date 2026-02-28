//
//  ObstacleDefinition.swift
//  CatRoadKit
//
import SwiftUI

public struct ObstacleDefinition {
    public let pixels: [Pixel]
    public let size: CGSize  // 기준: pixelSize=4.0 → 16x20pt

    public init(pixels: [Pixel], size: CGSize) {
        self.pixels = pixels
        self.size = size
    }
}

public let obstacleDefinitions: [ObstacleDefinition] = [
    ObstacleDefinition(pixels: cactusSmall, size: CGSize(width: 16, height: 20)),
    ObstacleDefinition(pixels: cactusLarge, size: CGSize(width: 16, height: 20)),
    ObstacleDefinition(pixels: rock,        size: CGSize(width: 16, height: 20))
]

public let busDefinition = ObstacleDefinition(
    pixels: bus,
    size: CGSize(width: 48, height: 24)
)
