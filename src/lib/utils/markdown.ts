import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import type { DOMPurify } from 'dompurify';

let DP: DOMPurify | null = null;

// DOMPurify 인스턴스는 브라우저에서만 생성 가능
if (typeof window !== 'undefined') {
	DP = createDOMPurify(window);
}

// 허용할 태그와 속성을 명시적으로 지정
const ALLOWED_TAGS = [
	'p',
	'br',
	'b',
	'i',
	'em',
	'strong',
	'a',
	'ul',
	'ol',
	'li',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'blockquote',
	'code',
	'pre'
];

const ALLOWED_ATTR = ['href', 'target', 'rel'];

export function parseMarkdown(input: string): string {
	if (!DP) return ''; // SSR 방지

	// marked 옵션 설정
	marked.setOptions({
		gfm: true, // GitHub Flavored Markdown 활성화
		breaks: true // 줄바꿈 활성화
	});
	const rawHtml = marked.parse(input, { async: false });

	// DOMPurify를 이용한 더 엄격한 XSS 방지
	return DP.sanitize(rawHtml, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
		FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload', 'onmouseover'],
		ALLOW_DATA_ATTR: false,
		ADD_ATTR: ['target'], // 외부 링크를 위한 target 속성 허용
		FORCE_BODY: true, // 완전한 HTML 문서 강제
		SANITIZE_DOM: true // DOM 노드 정리
	});
}
