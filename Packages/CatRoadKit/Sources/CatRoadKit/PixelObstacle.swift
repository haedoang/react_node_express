//
//  PixelObstacle.swift
//  CatRoadKit
//
//  Created by HAEDONG KIM on 11/22/25.
//
import SwiftUI

public struct PixelObstacle: View {
    public let pixelSize: CGFloat
    public let pixels: [Pixel]

    public init(pixelSize: CGFloat, pixels: [Pixel]) {
        self.pixelSize = pixelSize
        self.pixels = pixels
    }

    public var body: some View {
        let maxX = pixels.map { $0.x }.max() ?? 0
        let maxY = pixels.map { $0.y }.max() ?? 0
        ZStack {
            ForEach(pixels, id: \.self) { pixel in
                Rectangle()
                    .fill(pixel.color)
                    .frame(width: pixelSize, height: pixelSize)
                    .position(x: CGFloat(pixel.x) * pixelSize, y: CGFloat(pixel.y) * pixelSize)
            }
        }
        .frame(width: pixelSize * CGFloat(maxX + 1), height: pixelSize * CGFloat(maxY + 1))
    }
}
