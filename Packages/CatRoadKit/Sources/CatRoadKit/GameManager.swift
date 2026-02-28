//
//  GameManager.swift
//  catroad Watch App
//
//  Created by HAEDONG KIM on 11/22/25.
//
import SwiftUI
#if os(watchOS)
import WatchKit
#endif

public class GameManager: ObservableObject {
    @Published public var cat: Cat
    @Published public var obstacles: [Obstacle] = []
    @Published public var score: Int = 0
    @Published public var highScore: Int = UserDefaults.standard.integer(forKey: "CatRoad.highScore")
    @Published public var gameOver: Bool = false
    @Published public var gameStarted: Bool = false
    @Published public var chaosMode: Bool = false
    private var frameCount: Int = 0
    private var spawnInterval: Int = 120
    private var gameLoopTask: Task<Void, Never>?
    private var scoreLoopTask: Task<Void, Never>?
    public let screenSize = CGSize(width: 184, height: 224)
    private let engine: GameEngine
    private let factory: ObstacleFactory
    private let difficultySystem = DifficultySystem()

    public init() {
        cat = Cat(
            position: CGPoint(x: 20, y: 224/2 - 16),
            targetY: 224/2 - 16
        )
        engine = GameEngine(screenSize: CGSize(width: 184, height: 224))
        factory = ObstacleFactory(screenSize: CGSize(width: 184, height: 224))
    }

    public func startGame() {
        gameStarted = true
        gameOver = false
        score = 0
        frameCount = 0
        spawnInterval = DifficultySystem.baseSpawnInterval
        obstacles = []
        chaosMode = false
        cat.position.y = screenSize.height / 2 - 16
        cat.targetY = cat.position.y

        gameLoopTask?.cancel()
        scoreLoopTask?.cancel()

        gameLoopTask = Task { @MainActor [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: 16_666_667)
                guard !Task.isCancelled, let self else { break }
                self.update()
            }
        }

        scoreLoopTask = Task { @MainActor [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: 1_000_000_000)
                guard !Task.isCancelled, let self else { break }
                guard self.gameStarted && !self.gameOver else { continue }
                self.score += 1
                self.updateDifficulty()
            }
        }
    }

    public func stopGame() {
        gameLoopTask?.cancel()
        scoreLoopTask?.cancel()
        gameLoopTask = nil
        scoreLoopTask = nil
        gameOver = true

        if score > highScore {
            highScore = score
            UserDefaults.standard.set(highScore, forKey: "CatRoad.highScore")
        }

        #if os(watchOS)
        WKInterfaceDevice.current().play(.failure)
        #endif
    }

    deinit {
        gameLoopTask?.cancel()
        scoreLoopTask?.cancel()
    }

    public func moveUp() { guard gameStarted && !gameOver else { return }; cat.moveUp(in: CGRect(origin: .zero, size: screenSize)) }
    public func moveDown() { guard gameStarted && !gameOver else { return }; cat.moveDown(in: CGRect(origin: .zero, size: screenSize)) }

    public func activateChaosMode() {
        guard gameStarted && !gameOver && !chaosMode else { return }
        chaosMode = true
        spawnInterval = DifficultySystem.minSpawnInterval
        #if os(watchOS)
        WKInterfaceDevice.current().play(.notification)
        #endif
    }

    private var effectiveScore: Int {
        chaosMode ? max(score, 300) : score
    }

    private func update() {
        guard !gameOver else { return }
        frameCount += 1
        if frameCount % spawnInterval == 0 {
            let count = difficultySystem.spawnCount(for: effectiveScore)
            obstacles.append(contentsOf: factory.makeObstacles(count: count, score: effectiveScore))
        }
        let speed = difficultySystem.obstacleSpeed(for: effectiveScore)
        let collision = engine.advance(cat: &cat, obstacles: &obstacles, obstacleSpeed: speed)
        if collision { stopGame() }
    }

    private func updateDifficulty() {
        spawnInterval = difficultySystem.spawnInterval(for: score)
    }
}
