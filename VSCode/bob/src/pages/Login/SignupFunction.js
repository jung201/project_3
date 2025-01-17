import React, { useState } from 'react';

//유효성 검사 관련 함수
export const validateField = (name, value, formData) => {
    if (typeof value !== 'string') {
        value = value ? String(value) : '';
      }
    const rules = {
      id: {
        pattern: /^(?![0-9]+$)(?!.*[^a-zA-Z0-9]).{8,}$/,
        message: '아이디는 영문 또는 숫자를 포함하며, 숫자로만 구성될 수 없습니다.',
      },
      pw: {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[^\s]{8,}$/,
        message: '비밀번호는 8자 이상이며, 특수문자를 포함해야합니다.',
      },
      pwcheck: {
        match: 'pw',
        message: '비밀번호가 일치하지 않습니다.',
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.(com|org|net)$/,
        message: '이메일은 유효한 도메인(@example.com, @example.org 등)이어야 합니다.',
      },
      nickname: {
        pattern: /^[A-Za-z가-힣0-9]{2,}$/,
        message: '닉네임은 2자 이상, 특수문자를 제외한 문자로 입력해주세요.',
      },
      phone2: {
        pattern: /^\d{3,4}$/,
        message: '전화번호 중간 자리는 3~4자리 숫자여야 합니다.',
      },
      phone3: {
        pattern: /^\d{4}$/,
        message: '전화번호 마지막 자리는 4자리 숫자여야 합니다.',
      },
      type: {
        required: true,
        message: '배기량을 선택해주세요.',
      },
    };
  
    const rule = rules[name];
    if (!value || value.trim() === '') return `${name}을(를) 입력해주세요.`; // 공란 체크 강화
    if (rule?.pattern && !rule.pattern.test(value)) return rule.message; // 정규식 패턴 체크
    if (rule?.match && value !== formData[rule.match]) return rule.message; // 비밀번호 확인 체크
    return '';
  };

