//
//  CatRoad_Watch_AppUITests.swift
//  CatRoad Watch AppUITests
//
//  Created by HAEDONG KIM on 11/24/25.
//

import XCTest

final class CatRoad_Watch_AppUITests: XCTestCase {

    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    @MainActor
    func testAppLaunches() throws {
        let app = XCUIApplication()
        app.launch()

        // Verify start button exists
        let startButton = app.buttons["시작"]
        XCTAssertTrue(startButton.exists)
    }

    @MainActor
    func testLaunchPerformance() throws {
        measure(metrics: [XCTApplicationLaunchMetric()]) {
            XCUIApplication().launch()
        }
    }
}
