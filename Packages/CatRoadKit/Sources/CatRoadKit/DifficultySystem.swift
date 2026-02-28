//
//  DifficultySystem.swift
//  CatRoadKit
//
import CoreGraphics

public struct DifficultySystem {
    public static let baseSpawnInterval: Int = 90     // 1.5초 @ 60fps (기존 120)
    public static let minSpawnInterval: Int = 30      // 최소 0.5초 (기존 38)
    public static let baseObstacleSpeed: CGFloat = 2.5  // 초기 속도 (기존 2.0)
    public static let maxObstacleSpeed: CGFloat = 7.5   // 최대 속도 (기존 6.5)

    public init() {}

    // 스폰 간격: 더 빠르게 감소
    // score=0: 90프레임(1.5s), score=50: ~70, score=150: ~42, score=230+: 30
    public func spawnInterval(for score: Int) -> Int {
        let t = Double(score) * 0.007
        let interval = Double(Self.baseSpawnInterval) * exp(-t)
        return max(Self.minSpawnInterval, Int(interval))
    }

    // 장애물 속도: 초반부터 약간 빠르게
    // score=0: 2.5, score=36: 4.0, score=100: 5.0, score=400: 7.5(cap)
    public func obstacleSpeed(for score: Int) -> CGFloat {
        let speed = Self.baseObstacleSpeed + CGFloat(sqrt(Double(score))) * 0.3
        return min(speed, Self.maxObstacleSpeed)
    }

    // 동시 스폰 수: 더 빠르게 증가
    // score < 30: 1개, score 30-79: 2개, score 80+: 3개
    public func spawnCount(for score: Int) -> Int {
        switch score {
        case ..<30:   return 1
        case 30..<80: return 2
        default:      return 3
        }
    }
}
