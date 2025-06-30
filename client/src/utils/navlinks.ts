interface Links {
  id: number;
  title: string;
  to: string;
  // Optional property
}

export const links: Links[] = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Events", to: "/events" },
  { id: 3, title: "Add Events", to: "/add-events" },
  { id: 4, title: "My Event", to: "/my-event" },
];
