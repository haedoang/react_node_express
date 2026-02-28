//
//  ObstacleFactory.swift
//  CatRoadKit
//
import SwiftUI

public struct ObstacleFactory {
    private let screenSize: CGSize
    public static let burstSpacing: CGFloat = 90

    public init(screenSize: CGSize) {
        self.screenSize = screenSize
    }

    public func makeObstacles(count: Int, score: Int = 0) -> [Obstacle] {
        guard count > 0 else { return [] }
        return (0..<count).map { i in
            makeObstacleAt(xOffset: CGFloat(i) * Self.burstSpacing, score: score)
        }
    }

    private func makeObstacleAt(xOffset: CGFloat, score: Int) -> Obstacle {
        let definition = pickDefinition(score: score)
        let yPositions: [CGFloat] = [190, 140, screenSize.height / 2 - 10, 50, 20]
        return Obstacle(
            position: CGPoint(x: screenSize.width + 80 + xOffset, y: yPositions.randomElement()!),
            size: definition.size,
            pixels: definition.pixels
        )
    }

    private func pickDefinition(score: Int) -> ObstacleDefinition {
        // score 100 이상: 25% 확률로 버스 등장
        if score >= 100 && Int.random(in: 0..<4) == 0 {
            return busDefinition
        }
        return obstacleDefinitions.randomElement()!
    }
}
