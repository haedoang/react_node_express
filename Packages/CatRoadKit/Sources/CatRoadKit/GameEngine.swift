//
//  GameEngine.swift
//  CatRoadKit
//
import SwiftUI

public struct GameEngine {
    private let screenSize: CGSize

    public init(screenSize: CGSize) {
        self.screenSize = screenSize
    }

    /// 1프레임 진행. 충돌 발생 시 true 반환
    public func advance(
        cat: inout Cat,
        obstacles: inout [Obstacle],
        obstacleSpeed: CGFloat
    ) -> Bool {
        cat.update()
        for i in (0..<obstacles.count).reversed() {
            obstacles[i].position.x -= obstacleSpeed
            if obstacles[i].intersects(with: cat) { return true }
            if obstacles[i].position.x + obstacles[i].size.width < 0 {
                obstacles.remove(at: i)
            }
        }
        return false
    }
}
