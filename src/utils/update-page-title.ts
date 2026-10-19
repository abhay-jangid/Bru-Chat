export const updatePageTitle = (title: string = 'Bru Chat - Free, local-first AI web companion') => {
  const pageTitle = document.querySelector("title")
  if (pageTitle) {
    pageTitle.textContent = title
  } else {
    console.warn("No title element found to update.")
  }
}
