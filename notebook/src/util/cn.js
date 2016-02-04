export default function cn(...classNames) {
  return classNames.filter((v) => !!v).join(" ");
}
