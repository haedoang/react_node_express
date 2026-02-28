//
//  PixelCat.swift
//  CatRoadKit
//
//  Created by HAEDONG KIM on 11/22/25.
//
import SwiftUI

public struct PixelCat: View {
    public let pixelSize: CGFloat
    public let pixels: [Pixel]

    public init(pixelSize: CGFloat, pixels: [Pixel]) {
        self.pixelSize = pixelSize
        self.pixels = pixels
    }

    public var body: some View {
        ZStack {
            ForEach(pixels, id: \.self) { pixel in
                Rectangle()
                    .fill(pixel.color)
                    .frame(width: pixelSize, height: pixelSize)
                    .position(x: CGFloat(pixel.x) * pixelSize, y: CGFloat(pixel.y) * pixelSize)
            }
        }
        .frame(width: pixelSize * 10, height: pixelSize * 8)
    }
}
