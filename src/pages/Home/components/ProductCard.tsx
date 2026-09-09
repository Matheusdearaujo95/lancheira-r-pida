import styles from './ProductCard.module.css';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</p>
        <button className={styles.button} onClick={onAddToCart}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}