import { Library } from "../script/Library";

let library: Library;
beforeEach(() => {
  library = new Library();
});

test("Create Book", () => {
  // prettier-ignore
  expect(library.createBook("Flowers for Algernon", "Daniel Keyes", true)).toBeDefined();
  // prettier-ignore
  expect(library.length).toEqual(1);
  // prettier-ignore
  expect(library.createBook("Eleanor Oliphant is Completely Fine", "Gail Honeyman", false)).toBeDefined();
  // prettier-ignore
  expect(library.length).toEqual(2);
});

test("Retrieve Book", () => {
  // prettier-ignore
  const flowers = library.createBook("Flowers for Algernon", "Daniel Keyes", true);
  // prettier-ignore
  const eleanor = library.createBook("Eleanor Oliphant is Completely Fine", "Gail Honeyman", false);

  expect(library.retrieveBook(flowers.id)).toBe(flowers);
  expect(library.retrieveBook(eleanor.id)).toBe(eleanor);
});

test("Update Book", () => {
  // prettier-ignore
  const flowers = library.createBook("Flowers for Algernon", "Daniel Keyes", true);
  const eleanor = {
    title: "Eleanor Oliphant is Completely Fine",
    author: "Gail Honeyman",
    owned: false,
  } satisfies Pick<Book, "title" | "author" | "owned">;

  const updatedBook = library.updateBook({
    id: flowers.id,
    title: eleanor.title,
    author: eleanor.author,
    owned: eleanor.owned,
  });

  expect(updatedBook?.title).toEqual(eleanor.title);
  expect(updatedBook?.author).toEqual(eleanor.author);
  expect(updatedBook?.owned).toEqual(eleanor.owned);
});

test("Delete Book", () => {
  // prettier-ignore
  const flowers = library.createBook("Flowers for Algernon", "Daniel Keyes", true);
  // prettier-ignore
  const eleanor = library.createBook("Eleanor Oliphant is Completely Fine", "Gail Honeyman", false);

  expect(library.length).toEqual(2);

  library.deleteBook(flowers.id);
  expect(library.length).toEqual(1);
  library.deleteBook(eleanor.id);
  expect(library.length).toEqual(0);
});

test("Retrieve Book Unknown", () => {
  expect(library.retrieveBook("invalid_id")).toBe(undefined);
});
