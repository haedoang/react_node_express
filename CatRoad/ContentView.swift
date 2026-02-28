//
//  ContentView.swift
//  CatRoad
//
//  Created by haedoang on 2/28/26.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // App Icon & Title
                VStack(spacing: 12) {
                    Image(systemName: "applewatch")
                        .font(.system(size: 60))
                        .foregroundColor(.orange)
                    Text("CatRoad")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                    Text("Apple Watch 전용 게임")
                        .foregroundColor(.secondary)
                }
                .padding(.top, 40)

                Divider()

                // How to Play
                VStack(alignment: .leading, spacing: 16) {
                    Text("Apple Watch에서 실행하기")
                        .font(.title2)
                        .fontWeight(.semibold)

                    GuideRow(icon: "applewatch", step: "1", text: "Apple Watch에서 CatRoad 앱을 실행하세요")
                    GuideRow(icon: "hand.tap", step: "2", text: "화면을 탭하여 게임을 시작하세요")
                    GuideRow(icon: "digitalcrown.arrow.clockwise", step: "3", text: "Digital Crown을 돌려 고양이를 이동하세요")
                    GuideRow(icon: "hand.draw", step: "4", text: "화면을 드래그해도 이동할 수 있어요")
                    GuideRow(icon: "exclamationmark.triangle", step: "5", text: "장애물을 피해 최고 점수를 기록하세요!")
                }
                .padding(.horizontal)

                Divider()

                // Tips
                VStack(alignment: .leading, spacing: 12) {
                    Text("Tips")
                        .font(.title2)
                        .fontWeight(.semibold)

                    TipRow(icon: "speedometer", text: "점수가 올라갈수록 속도가 빨라집니다")
                    TipRow(icon: "bus.fill", text: "버스 장애물은 크기가 크니 주의하세요")
                    TipRow(icon: "trophy", text: "최고 점수는 자동으로 저장됩니다")
                }
                .padding(.horizontal)

                Spacer(minLength: 40)
            }
        }
    }
}

struct GuideRow: View {
    let icon: String
    let step: String
    let text: String

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(Color.orange.opacity(0.15))
                    .frame(width: 44, height: 44)
                Image(systemName: icon)
                    .foregroundColor(.orange)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text("Step \(step)")
                    .font(.caption)
                    .foregroundColor(.orange)
                    .fontWeight(.semibold)
                Text(text)
                    .font(.subheadline)
            }
        }
    }
}

struct TipRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.orange)
                .frame(width: 24)
            Text(text)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
}

#Preview {
    ContentView()
}
