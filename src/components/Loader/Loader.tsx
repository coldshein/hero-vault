import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <section className="min-h-[50vh] w-full flex items-center justify-center">
            <div className={styles.spinner}></div>
        </section>
    )
}