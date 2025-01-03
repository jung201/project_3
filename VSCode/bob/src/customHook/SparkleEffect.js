import React, { useEffect } from "react";
import "../static/scss/global.scss"; // 글로벌 스타일 임포트

const SparklePage = () => {
    useEffect(() => {
        // body에 sparkle-effect 클래스 추가
        document.body.classList.add("sparkle-effect");

        // 마우스 움직임 이벤트 추가
        const handleMouseMove = (e) => {
            const sparkle = document.createElement("div");
            sparkle.classList.add("sparkle");
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove(); // 효과 삭제
            }, 500);
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            // 페이지 나갈 때 이벤트와 클래스 제거
            document.body.classList.remove("sparkle-effect");
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <main>
            <h1>반짝이는 효과 페이지 🌟</h1>
        </main>
    );
};

export default SparklePage;
