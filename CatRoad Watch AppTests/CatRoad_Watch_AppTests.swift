//
//  CatRoad_Watch_AppTests.swift
//  CatRoad Watch AppTests
//
//  Created by HAEDONG KIM on 11/24/25.
//

import XCTest
import CatRoadKit

final class CatRoad_Watch_AppTests: XCTestCase {

    func testGameManagerInitialization() {
        let manager = GameManager()
        XCTAssertEqual(manager.score, 0)
        XCTAssertFalse(manager.gameStarted)
        XCTAssertFalse(manager.gameOver)
        XCTAssertTrue(manager.obstacles.isEmpty)
    }

    func testGameLifecycle() {
        let manager = GameManager()
        manager.startGame()
        XCTAssertTrue(manager.gameStarted)

        manager.stopGame()
        XCTAssertTrue(manager.gameOver)
    }
}
