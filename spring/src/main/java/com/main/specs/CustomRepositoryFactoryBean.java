package com.main.specs;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;
import javax.persistence.EntityManager;
import java.io.Serializable;

/**
 * 自定义RepositoryFactoryBean,自定义JpaRepositoryFactoryBean 替代默认RepositoryFactoryBean，
 * 我们会获得一个RepositoryFactory，
 * RepositoryFactory将会注册我们自定义的Repository的实现。
 *
 * @param <T>
 * @param <S>
 * @param <ID>
 * @author ryz2593
 */
public class CustomRepositoryFactoryBean<T extends JpaRepository<S, ID>, S, ID extends Serializable>
        extends JpaRepositoryFactoryBean<T, S, ID> {
    public CustomRepositoryFactoryBean(Class<? extends T> repositoryInterface) {
        super(repositoryInterface);
    }// 1自定义RepositoryFactoryBean,继承JpaRepositoryFactoryBean.

    /**
     * //2重写createRepositoryFactory方法，用当前的额CustomRepositoryFactory创建实例
     *
     * @param entityManager
     * @return
     */
    @Override
    protected RepositoryFactorySupport createRepositoryFactory(EntityManager entityManager) {
        return new CustomRepositoryFactory(entityManager);
    }

    /**
     * // 3常见CustomRepositoryFactory,并继承JpaRepositoryFactory
     */
    private static class CustomRepositoryFactory extends JpaRepositoryFactory {


        public CustomRepositoryFactory(EntityManager entityManager) {
            super(entityManager);
        }

        /**
         * // 4重写getTargetRepository方法，获得当前自定义的Repository实现
         *
         * @return
         */
//        @Override
//        @SuppressWarnings({"unchecked"})
//        protected <T, ID extends Serializable> SimpleJpaRepository<?, ?> getTargetRepository() {
//            return getTargetRepository(null, null);
//        }
//
//        /**
//         * // 4重写getTargetRepository方法，获得当前自定义的Repository实现
//         *
//         * @param information
//         * @param entityManager
//         * @param <T>
//         * @param <ID>
//         * @return
//         */
//        @Override
//        @SuppressWarnings({"unchecked"})
//        protected <T, ID extends Serializable> SimpleJpaRepository<?, ?> getTargetRepository(
//                RepositoryInformation information, EntityManager entityManager) {
//            return new CustomRepositoryImpl<T, ID>((Class<T>) information.getDomainType(), entityManager);
//
//        }

        /**
         * // 5重写getRepositoryBaseClass, 获得当前自定义的Repository实现的类型
         *
         * @param metadata
         * @return
         */
        @Override
        protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata) {
            return CustomRepositoryImpl.class;
        }
    }
}
