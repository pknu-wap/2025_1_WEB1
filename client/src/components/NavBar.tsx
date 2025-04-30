import { useState } from 'react';
import { Home, Plus, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'assets/style/_flex.scss';
import 'assets/style/_typography.scss';
import './NavBar.scss';
import StudyGroupForm from 'features/studyGroupForm/StudyGroupForm';

const NavBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isStudyGroupFormOpen, setIsStudyGroupFormOpen] = useState(false);

	const isActive = (path: string) => location.pathname === path;

	const openStudyGroupForm = () => {
		setIsStudyGroupFormOpen(true);
	};

	const closeStudyGroupForm = () => {
		setIsStudyGroupFormOpen(false);
	};

	return (
		<>
			<nav className="nav-bar flex-center">
				<button
					onClick={() => navigate('/')}
					className={isActive('/') ? 'active' : ''}
				>
					<Home />
				</button>
				<button onClick={openStudyGroupForm} className="plus-button">
					<Plus />
				</button>
				<button
					onClick={() => navigate('/mypage')}
					className={isActive('/mypage') ? 'active' : ''}
				>
					<User />
				</button>
			</nav>

			{/* 모달 */}
			{isStudyGroupFormOpen && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0,0,0,0.2)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 1500,
					}}
				>
					<div
						style={{
							background: 'white',
							borderRadius: '16px',
							padding: '32px',
							width: '300px',
							position: 'relative',
							boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
						}}
					>
						<button
							onClick={closeStudyGroupForm}
							style={{
								position: 'absolute',
								top: '16px',
								right: '16px',
								fontSize: '24px',
								background: 'none',
								border: 'none',
								cursor: 'pointer',
							}}
						>
							✕
						</button>
						<StudyGroupForm />
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
