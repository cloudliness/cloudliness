export const getPreviewText = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  return text.length > 200 ? text.substring(0, 200) + '...' : text;
};
