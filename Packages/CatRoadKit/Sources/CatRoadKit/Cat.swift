//
//  Cat.swift
//  CatRoadKit
//
//  Created by HAEDONG KIM on 11/22/25.
//
import SwiftUI

public struct Cat {
    public var position: CGPoint
    public var targetY: CGFloat
    public let size: CGSize = CGSize(width: 40, height: 32)
    public let speed: CGFloat = 5.0

    public init(position: CGPoint, targetY: CGFloat) {
        self.position = position
        self.targetY = targetY
    }

    public mutating func moveUp(in bounds: CGRect) { targetY = max(10, targetY - speed) }
    public mutating func moveDown(in bounds: CGRect) { targetY = min(bounds.height - size.height - 5, targetY + speed) }
    public mutating func update() { position.y += (targetY - position.y) * 0.15 }
    public func frame() -> CGRect { CGRect(origin: position, size: size) }
}
